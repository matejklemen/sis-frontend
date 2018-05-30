(function() {
  var maintenanceProfessorsCtrl = function($scope, $routeParams, $location, $filter, $uibModal, $window, authenticationService, codelistService, courseOrganizationService) {
    var vm = this;
    /* Get role */
    vm.role = authenticationService.getRole();
    vm.loginId = authenticationService.getLoginId();

    vm.search = {
      'studyYear': null
    };

    codelistService.getCodelist("studyyears").then(
      function success(response) {
        vm.studyYears = response.data;
        // automatically select stored selection
        var storedSelection = $window.localStorage.getItem("maintenanceProfessorsSelection.studyYearId");
        if(storedSelection) {
          vm.studyYears.some(function(elem, index, array) {
            if(elem.id == storedSelection) {
              vm.search.studyYear = elem;
            }
          });
        } else {
          vm.search.studyYear = vm.studyYears[vm.studyYears.length-1];
        }
      },
      function error(error) {
        console.log("Oh no...", error);
      }
    );

    vm.getCourseOrganizations = function() {
      if(vm.search.studyYear === null) {
        vm.selectionError = true;
        return;
      }
      // save selection value
      $window.localStorage.setItem("maintenanceProfessorsSelection.studyYearId", vm.search.studyYear.id);

      vm.selectionError = false;

      courseOrganizationService.getCourseOrganizationsByStudyYear(vm.search.studyYear).then(
        function success(response) {
          vm.courseOrganizations = response.data;
        },
        function error(error) {
          console.log("Nicht gut!", error);
        }
      );
    };

    vm.openEditEntryModal = function(entry, index) {
      var entryCopy = angular.copy(entry);
      var modalInstance = $uibModal.open({
        templateUrl: 'shared/directives/maintenanceProfessors/maintenanceProfessors.modalview.html',
        controller: 'maintenanceProfessorsEntryCtrl',
        controllerAs: 'vm',
        resolve: {
          resModeEdit: function() {
            return entry;
          }
        }
      });

      // get result from modal after it's closed here
      modalInstance.result.then(
        function(result) {
        },
        function(closeInfo) {
          // revert any changes to entry when modal is cancelled
          angular.copy(entryCopy, entry);
        }
      );
    };
  };

  angular
  .module('sis')
  .controller('maintenanceProfessorsCtrl', maintenanceProfessorsCtrl);
})();
