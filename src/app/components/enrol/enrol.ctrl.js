(function() {
  var enrolCtrl = function($scope, $routeParams, $window, studentService, tokenService) {
    var vm = this;

    tokenService.getTokenByStudentId($routeParams.studentId).then(
      function success(response) {
        console.log(response.data);
        vm.token = response.data;
        if(vm.token.used) {
          $window.location.href = "/";
        } else {
          getStudentData(vm.token.student);
        }
      },
      function error(error) {
        $window.location.href = "/";
      }
    );

    function getStudentData(id) {
      studentService.getByStudentId(id).then(
        function success(response) {
          console.log(response.data);
          vm.student = response.data;
        },
        function error(error) {
          
        }
      );
    }

  };

  angular
    .module('sis')
    .controller('enrolCtrl', enrolCtrl);
})();