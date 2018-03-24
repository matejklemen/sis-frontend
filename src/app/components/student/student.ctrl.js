(function() {
  var studentCtrl = function($scope, $routeParams, studentService) {
    var vm = this;

    vm.searchValue = "";

    vm.performSearch = function() {
      console.log("Seaching...");

      studentService.searchStudents(vm.searchValue).then(
        function success(response) {
          vm.searchResult = response.data;
          //console.log(vm.searchResult[0]);
        },
        function error(response) {
          console.error("Oh no... ", response);
        }
      );

    };

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
    }

  };

  angular
    .module('sis')
    .controller('studentCtrl', studentCtrl);
})();