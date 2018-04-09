(function() {
  var studentCtrl = function($scope, $window, $routeParams, studentService, tokenService) {
    var vm = this;

    if($routeParams.registerNumber != null) {
      // pridobi in prikazi podatke o studentu
      studentService.getByRegisterNumber($routeParams.registerNumber).then(
        function success(response) {
          vm.student = response.data;
          //console.log(response.data);

          tokenService.getTokenByStudentId(vm.student.id).then(
            function success(response) {
              //console.log(response.data);
              vm.hasToken = !response.data.used;
            },
            function error(error) {}
          );
        },
        function error(response) {
          console.error("Oh no... ", response);
          $window.location.href = "/";
        }
      );

    } else {
      console.error("parameter registerNumber is null");
      $window.location.href = "/";
    }

  };

  angular
    .module('sis')
    .controller('studentCtrl', studentCtrl);
})();