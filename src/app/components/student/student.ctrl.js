(function() {
  var studentCtrl = function($scope, $location, $routeParams, studentService, enrolmentService, tokenService, exporterService, $window, authenticationService) {
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

          enrolmentService.getEnrolmentsForStudent(vm.student.id).then(
            function success(response) {
              vm.enrolments = response.data;
              console.log(vm.enrolments);
            },
            function error(error) {
              console.log("Oh no...", error);
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

    /* Vpisni list */
    vm.viewEnrolmentPdf = function(){
      exporterService.getPdfEnrolmentSheet(vm.enrolments[0].student);
    };
  };

  angular
    .module('sis')
    .controller('studentCtrl', studentCtrl);
})();