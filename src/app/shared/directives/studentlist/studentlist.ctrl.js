(function() {
  var studentlistCtrl = function($scope, $routeParams, studentService, exporterService) {
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
      exporterService.getFile(action, vm.searchResult, "Seznam študentov", ["#", "Vpisna številka", "Ime", "Priimek"], ["registerNumber", "name", "surname"])
    };

  };

  angular
  .module('sis')
  .controller('studentlistCtrl', studentlistCtrl);
})();
