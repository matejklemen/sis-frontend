(function() {
  var studentCtrl = function($scope, $location, $routeParams, $uibModal, studentService, enrolmentService, tokenService, exporterService, $filter, $window, authenticationService,examTermService) {
    var vm = this;

    vm.role = authenticationService.getRole();

    if($routeParams.registerNumber != null) {
      // pridobi in prikazi podatke o studentu
      studentService.getByRegisterNumber($routeParams.registerNumber).then(
        function success(response) {
          vm.student = response.data[0];
          //console.log(response.data);

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
            },
            function error(error) {
              console.log("Oh no...", error);
              vm.enrolments = []; // assigning empty array hides progress bar
            }
          );

          examTermService.getExamTermsForStudent(vm.student.id).then(
            function succes(response){
              vm.examTerms = response.data;
              vm.hideInt = 10;
              vm.examTermsCount = response.data.length;

              vm.examTerms.sort(function(a,b){
                // Turn your strings into dates, and then subtract them
                // to get a value that is either negative, positive, or zero.

                // We loop once but calculate for a and b so first and last element are in
                a.isValid = new Date(a.datetime) - Date.now() > 0 ? true : false;
                b.isValid = new Date(b.datetime) - Date.now() > 0 ? true : false;
                return new Date(a.datetime) - new Date(b.datetime);
              });

              console.log(vm.examTerms)
            },
            function error(error) {
              vm.examTerms = []; // assigning empty array hides progress bar
              console.log("Oh no...",error);
            }
          );
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

    vm.history = function(term) {
      showStudentSignModal('history', term);
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