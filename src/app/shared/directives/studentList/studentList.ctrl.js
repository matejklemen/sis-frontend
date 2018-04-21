(function() {
  var studentListCtrl = function($scope, $routeParams, studentService) {
    var vm = this;

    vm.searchValue = "";
    vm.searchInProgress = false;

    vm.performSearch = function() {
      if(vm.searchValue == undefined || vm.searchValue == "") {
        vm.searchIsEmpty = true;
      } else {
        vm.searchIsEmpty = false;
        vm.searchInProgress = true;

        studentService.searchStudents(vm.searchValue).then(
          function success(response) {
            vm.searchResult = response.data;
            vm.searchInProgress = false;
            //console.log(vm.searchResult[0]);
          },
          function error(response) {
            console.error("Oh no... ", response);
            vm.searchInProgress = false;
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
  .controller('studentListCtrl', studentListCtrl);
})();
