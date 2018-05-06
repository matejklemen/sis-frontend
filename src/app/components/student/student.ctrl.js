(function() {
  var studentCtrl = function($scope, $location, $routeParams, studentService, enrolmentService, examTermService, tokenService, exporterService, $window, authenticationService) {
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

          // TODO: replace this with getting student's exam terms
          examTermService.getAllExamTerms(0, 10, null, null).then(
            function success(response) {
              vm.examTerms = response.data;
              console.log(response.data);
            },
            function error(error) {
              console.log(error);
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
      if(window.confirm("Prijavim na izpit pri predmetu " + term.course.course.name + ", " + term.datetime + "?")) {
        // TODO: izvedi prijavo ...
      }
    };

    vm.signDown = function(term) {
      if(window.confirm("Odjavim z izpita pri predmetu " + term.course.course.name + ", " + term.datetime + "?")) {
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