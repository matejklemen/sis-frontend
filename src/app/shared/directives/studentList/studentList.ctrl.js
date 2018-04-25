(function() {
  var studentListCtrl = function($routeParams, studentService, exporterService) {
    var vm = this;

    vm.search = {
      value: "",
      order: "registerNumber DESC",
    };

    vm.searchInProgress = false;

    vm.performSearch = function() {
      if(vm.search.value == undefined || vm.search.value == "") {
        vm.searchIsEmpty = true;
      } else {
        vm.searchIsEmpty = false;
        vm.searchInProgress = true;

        studentService.searchStudents(vm.search).then(
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
      exporterService.getFile(action, vm.searchResult, "Seznam študentov", ["#", "Vpisna številka", "Ime", "Priimek"], ["registerNumber", "name", "surname"]);
    };

  };

  angular
  .module('sis')
  .controller('studentListCtrl', studentListCtrl);
})();
