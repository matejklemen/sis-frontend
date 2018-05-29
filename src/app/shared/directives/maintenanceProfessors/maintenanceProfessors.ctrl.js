(function() {
  var maintenanceProfessorsCtrl = function($scope, $routeParams, $location, $filter, $uibModal, codelistService, courseOrganizationService) {
    var vm = this;

    vm.error = {};

    vm.search = {
      studyYear: "",
      studyProgram : "",
      year: ""
    };

    codelistService.getCodelist("studyyears").then(
      function success(response) {
        vm.studyYears = response.data;
        vm.search.studyYear = vm.studyYears[vm.studyYears.length-1];
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

    vm.performQuery = function() {
      vm.error.studyYear = (vm.search.studyYear == undefined || vm.search.studyYear == "");

      if(vm.error.studyYear) return;

      vm.searched = {
        studyYear: vm.search.studyYear,
        studyProgram: vm.search.studyProgram,
        year: vm.search.year 
      };

      vm.error = {};
      vm.queryInProgress = true;

      courseOrganizationService.getCourseOrganizationsByQuery(vm.search).then(
        function success(response) {
          vm.searchResult = response.data;
          vm.queryInProgress = false;
        },
        function error(response) {
          console.error("Oh no... ", response);
          vm.queryInProgress = false;
        }
      );
      }
  };

  angular
  .module('sis')
  .controller('maintenanceProfessorsCtrl', maintenanceProfessorsCtrl);
})();
