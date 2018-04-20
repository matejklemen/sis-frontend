(function() {
  var studentlistCtrl = function($scope, $routeParams, studentService) {
    var vm = this;

    vm.searchValue = "";

    vm.performSearch = function() {
      console.log("Seaching...");

      if(vm.searchValue == undefined || vm.searchValue == "") {
        vm.searchIsEmpty = true;
      } else {
        vm.searchIsEmpty = false;

        studentService.searchStudents(vm.searchValue).then(
          function success(response) {
            vm.searchResult = response.data;
            //console.log(vm.searchResult[0]);
          },
          function error(response) {
            console.error("Oh no... ", response);
          }
        );
        
      }

    };

    vm.exportAction = function(action) {
      switch(action){
        case 'pdf':
          $scope.$broadcast('export-pdf', {"ignore": [3,4]});
          break;
        case 'csv':
          $scope.$broadcast('export-csv', {"ignore": [3,4]});
          break;
        default: console.log('no event caught');
      }
    };

  };

  angular
  .module('sis')
  .controller('studentlistCtrl', studentlistCtrl);
})();
