(function() {
  var studentListCtrl = function($window, studentService, exporterService, authenticationService, codelistService) {
    var vm = this;

    vm.role = authenticationService.getRole();

    vm.search = {
      value: "",
      studyYear: "",
      studyProgram : "",
      year: "",
      order: "registerNumber DESC",
    };

    codelistService.getCodelist("studyyears").then(
      function success(response) {
        vm.studyYears = response.data;
        vm.studyYears.unshift({name: ""});
        vm.search.studyYear = vm.studyYears[0];
      },
      function error(error) {
        console.log("Oh no...", error);
      }
    );

    codelistService.getCodelist("studyprograms").then(
      function sucess(response) {
        vm.studyPrograms = response.data;
        vm.studyPrograms.unshift({name: ""});
        vm.search.studyProgram = vm.studyPrograms[0];
      },
      function error(error) {
        cosole.log("Oh no...", error);
      }
    )

    vm.searchInProgress = false;

    vm.performSearch = function() {
      $window.localStorage.setItem("studentListSearch", JSON.stringify(vm.search));
      vm.searchInProgress = true;

      studentService.searchStudents(vm.search).then(
        function success(response) {
          vm.searchResult = response.data;
          vm.searchInProgress = false;
          console.log(vm.searchResult[0]);
        },
        function error(response) {
          console.error("Oh no... ", response);
          vm.searchInProgress = false;
        }
      );
    };

    var lastSearch = JSON.parse(localStorage.getItem("studentListSearch"));
    if(lastSearch !== null) {
      vm.search = lastSearch;
      vm.performSearch();
    }

  };

  angular
  .module('sis')
  .controller('studentListCtrl', studentListCtrl);
})();
