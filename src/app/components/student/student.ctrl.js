(function() {
  var studentCtrl = function($scope, $location, $routeParams, studentService, enrolmentService, tokenService, exporterService, $filter, $window, authenticationService,examTermService) {
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
                return new Date(a.datetime) - new Date(b.datetime);
              });
            },
            function error(error){
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

    vm.signUp = function(term) {
      if(window.confirm("Prijavim na izpit pri predmetu " + term.courseOrganization.course.name + ", " + $filter('formatDate')(term.datetime) + "?")) {
        // TODO: izvedi prijavo ...
      }
    };

    vm.signDown = function(term) {
      if(window.confirm("Odjavim z izpita pri predmetu " + term.courseOrganization.course.name + ", " + $filter('formatDate')(term.datetime) + "?")) {
        // TODO: izvedi odjavo ...
      }
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