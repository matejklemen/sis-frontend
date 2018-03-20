(function() {
  var studentCtrl = function($scope, $routeParams, studentService) {
    var vm = this;

    /*studentService.getByStudentVpisna("12345").then(
        function success(response) {
            vm.student = response.data;
        },
        function error(response) {
            console.log(response.e);
        }
    );*/
    if($routeParams.studentId != null) {
      // pridobi in prikazi podatke o studentu
      vm.student = studentService.getByStudentVpisna($routeParams.studentId);
    } else {
      // student ni izbran, prikazi search ? preusmeri ? 404 ?
    }

    vm.msg = "i am student";
  };

  angular
    .module('sis')
    .controller('studentCtrl', studentCtrl);
})();