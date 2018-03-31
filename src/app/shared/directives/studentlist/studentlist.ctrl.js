(function() {
  var studentlistCtrl = function($scope, $routeParams, studentService) {
    var vm = this;

    vm.searchValue = "";

    vm.performSearch = function() {
      console.log("Seaching...");

      studentService.searchStudents(vm.searchValue).then(
        function success(response) {
          vm.searchResult = response.data;
          console.log(vm.searchResult[0]);
        },
        function error(response) {
          console.error("Oh no... ", response);
        }
      );

    };

    vm.exportAction = function(action) {
      switch(action){
          case 'pdf': $scope.$broadcast('export-pdf', {});
                      break;
          case 'excel': $scope.$broadcast('export-excel', {});
                      break;
          case 'doc': $scope.$broadcast('export-doc', {});
                      break;
          default: console.log('no event caught');
       }
     }

  };

  angular
    .module('sis')
    .controller('studentlistCtrl', studentlistCtrl);
})();
