(function() {
  var studentCtrl = function($scope, $routeParams, studentService) {
    var vm = this;

    if($routeParams.studentId != null) {
      // pridobi in prikazi podatke o studentu
      vm.student = studentService.getByStudentId($routeParams.studentId).then(
        function success(response) {
          vm.student = response.data;
          console.log(response.data);
        },
        function error(response) {
          console.error("Oh no... ", response);
        }
      );
    } else {
      console.error("parameter studentId is null");
    }

  };

  angular
    .module('sis')
    .controller('studentCtrl', studentCtrl);
})();