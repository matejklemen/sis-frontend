(function() {
  var studentListCtrl = function($window, studentService, exporterService, authenticationService) {
    var vm = this;

    vm.role = authenticationService.getRole();

    vm.search = {
      value: "",
      order: "registerNumber DESC",
    };

    vm.searchInProgress = false;

    vm.performSearch = function() {
      if(vm.search.value == undefined || vm.search.value == "") {
        vm.searchIsEmpty = true;
      } else {
        $window.localStorage.setItem("studentListSearchQuery", vm.search.value);

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

    var lastSearch = localStorage.getItem("studentListSearchQuery");
    if(lastSearch !== null) {
      vm.search.value = lastSearch;
      vm.performSearch();
    }

  };

  angular
  .module('sis')
  .controller('studentListCtrl', studentListCtrl);
})();
