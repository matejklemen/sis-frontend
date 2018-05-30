(function() {
  var studentCtrl = function($scope, $location, $routeParams, $uibModal, studentService, enrolmentService, tokenService, agreementService, $filter, $window, authenticationService, examTermService,gradeData, exporterService) {
    var vm = this;

    vm.role = authenticationService.getRole();
    vm.loginId = authenticationService.getLoginId();

    if($routeParams.registerNumber != null) {
      // pridobi in prikazi podatke o studentu
      studentService.getByRegisterNumber($routeParams.registerNumber).then(
        function success(response) {
          vm.student = response.data[0];
          
          tokenService.getTokenByStudentId(vm.student.id).then(
            function success(response) {
              //console.log(response.data);
              vm.token = response.data;
              vm.hasToken = !response.data.used;
            },
            function error(error) {}
          );

          // get student's enrolments
          enrolmentService.getEnrolmentsForStudent(vm.student.id).then(
            function success(response) {
              vm.enrolments = response.data;
              console.log(vm.enrolments);
              vm.activeEnrolment = vm.enrolments[vm.enrolments.length-1].studyYear.id == 5;           
            },
            function error(error) {
              console.log("Oh no...", error);
              vm.enrolments = []; // assigning empty array hides progress bar
            }
          );

          examTermService.getExamTermsForStudent(vm.student.id).then(
            function success(response) {
              vm.examTerms = response.data;
              vm.hideInt = 10;
              vm.examTermsCount = response.data.length;

              // Sort by date
              vm.examTerms.sort(function(a,b) {
                return new Date(a.datetime) - new Date(b.datetime);
              });

              // Check if valid for deadline
              vm.examTerms.forEach(element => {
                var deadline = new Date(element.datetime);
                deadline.setDate(deadline.getDate() - 2);
                deadline.setMinutes(59, 0, 0);
                deadline.setHours(23);
                
                element.isValid = deadline - Date.now() >= 0 ? true : false;
              });

              console.log("Exam terms", vm.examTerms);
            },
            function error(error) {
              vm.examTerms = []; // assigning empty array hides progress bar
              console.log("Oh no...",error);
            }
          );

          gradeData.getGradeData(vm.student.id).then(
            function success(response){
              vm.studentCourses = response.data;
              console.log(response.data)
            },
            function error(error) {
              console.log("Oh no...",error);
            }
          );

          agreementService.getAgreementsForStudent(vm.student.id).then(
            function success(response) {
              vm.agreements = response.data;

              vm.hasAgreements = true;
            },
            function error(error) {
              console.log("Error obtaining agreements for student...");
              console.log(error);
            })

        },
        function error(response) {
          console.error("Oh no... ", response);
          $location.path("/");
        }
      );

    } else {
      console.error("parameter registerNumber is null");
      $location.path("/");
    }

    function showStudentSignModal(action, examTerm) {
      // action should be either 'signup' or 'signdown'
      var modalInstance = $uibModal.open({
        templateUrl: 'components/student/studentExamSign.modalview.html',
        controller: 'studentExamSignCtrl',
        controllerAs: 'vm',
        resolve: {
          resAction: function() {
            return action;
          },
          resStudent: function() {
            return vm.student;
          },
          resExamTerm: function() {
            return examTerm;
          },
          resUserLogin: function() {
            return vm.loginId;
          },
          resUserRole: function() {
            return vm.role;
          }
        }
      });

      // get result from modal after it's closed here
      modalInstance.result.then(
        function(result) {
          if(result == "signup") {
            // mark exam term as signed up to
            examTerm.signedUp = true;
          }
          if(result == "signdown") {
            // mark exam term as not signed up to
            examTerm.signedUp = false;
          }
        },
        function(closeInfo) {}
      );
    }

    vm.signUp = function(term) {
      showStudentSignModal('signup', term);
    };

    vm.signDown = function(term) {
      showStudentSignModal('signdown', term);
    };

    vm.signUpConfirm = function(term) {
      examTermService.putExamSignUp(vm.student.id, term.studentCoursesId, term.id, vm.loginId, true).then(
        function success(response) {
          console.log("Prijava uspešna.", response.data);
          term.confirmed = response.data.confirmed; // TODO: move that to modal result for clearer code
        },
        function error(error) {
          console.log("Prijava ni uspela, ", error);
          vm.sendStatus = error.data;
        }
      );
    };

    vm.history = function(examTerm) {
      // show history modal
      var modalInstance = $uibModal.open({
        templateUrl: 'components/student/studentExamHistory.modalview.html',
        controller: 'studentExamHistoryCtrl',
        controllerAs: 'vm',
        resolve: {
          resStudent: function() {
            return vm.student;
          },
          resExamTerm: function() {
            return examTerm;
          },
        }
      });

      // get result from modal after it's closed here
      modalInstance.result.then(
        function(result) {},
        function(closeInfo) {}
      );

    };

    /* Vpisni list */
    vm.viewEnrolmentPdf = function() {
      exporterService.getPdfEnrolmentSheet(vm.enrolments[0].student);
    };
  };

  angular
    .module('sis')
    .controller('studentCtrl', studentCtrl);
})();