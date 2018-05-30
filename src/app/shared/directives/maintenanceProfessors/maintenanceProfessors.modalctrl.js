(function() {
  var maintenanceProfessorsEntryCtrl = function($scope, $uibModalInstance, codelistService, courseOrganizationService, resModeEdit) {
    // if resModeEdit is false, we are adding a new entry.
    // if resModeEdit contains an object, we are editing it!

    var vm = this;
    vm.sendStatus = false;
    $scope.sortType = 'course.id'

    if(!resModeEdit) {
      vm.entry = {};
    } else {
      vm.entry = resModeEdit;
      vm.editMode = true;
    }
    console.log(vm.entry)

    vm.selected = {
      organizer1: "",
      organizer2: "",
      organizer3: ""
    };

    codelistService.getCodelist("professors").then(
      function success(response) {
        vm.organizers = response.data;
        vm.organizers.unshift({firstName: "", lastName1: "", lastName2: ""});
        vm.selected.organizer1 = vm.organizers[getindexOf(vm.organizers, (vm.entry.organizer1 ? vm.entry.organizer1.firstName : ""), (vm.entry.organizer1 ? vm.entry.organizer1.lastName1 : ""), (vm.entry.organizer1 ? vm.entry.organizer1.lastName2 : ""))];
        vm.selected.organizer2 = vm.organizers[getindexOf(vm.organizers, (vm.entry.organizer2 ? vm.entry.organizer2.firstName : ""), (vm.entry.organizer2 ? vm.entry.organizer2.lastName1 : ""), (vm.entry.organizer2 ? vm.entry.organizer2.lastName2 : ""))];
        vm.selected.organizer3 = vm.organizers[getindexOf(vm.organizers, (vm.entry.organizer3 ? vm.entry.organizer3.firstName : ""), (vm.entry.organizer3 ? vm.entry.organizer3.lastName1 : ""), (vm.entry.organizer3 ? vm.entry.organizer3.lastName2 : ""))];
      },
      function error(error) {
        console.log("Oh no...", error);
      }
    );

    vm.saveEntry = function() {
      if(vm.selected.organizer1.firstName == "") {
        vm.error = "Prvi izvajalec je obvezen";
        return;
      }
      if(vm.selected.organizer1.firstName != "" && vm.selected.organizer2.firstName != "" && vm.selected.organizer1.id == vm.selected.organizer2.id) {
        vm.error = "Prvi in drugi izvajalec ne moreta biti enaka";
        return;
      }
      if(vm.selected.organizer2.firstName != "" && vm.selected.organizer3.firstName != "" && vm.selected.organizer2.id == vm.selected.organizer3.id) {
        vm.error = "Drugi in tretji izvajalec ne moreta biti enaka";
        return;
      }
      if(vm.selected.organizer1.firstName != "" && vm.selected.organizer3.firstName != "" && vm.selected.organizer1.id == vm.selected.organizer3.id) {
        vm.error = "Prvi in tretji izvajalec ne moreta biti enaka";
        return;
      }

      vm.entry.organizer1 = (vm.selected.organizer1.firstName != "" ? vm.selected.organizer1 : null);
      vm.entry.organizer2 = (vm.selected.organizer2.firstName != "" ? vm.selected.organizer2 : null)
      vm.entry.organizer3 = (vm.selected.organizer3.firstName != "" ? vm.selected.organizer3 : null)
      courseOrganizationService.postCourseOrganization(vm.entry).then(
        function success(response) {
          $uibModalInstance.close(response.data);
        },
        function error(response) {
          vm.error = error.data;
        }
      );
    };

    vm.close = function() {
      $uibModalInstance.dismiss();
    };

    var getindexOf = function(array, firstName, lastName1, lastName2) {
      for(var i = 0; i < array.length; i++) {
        if(array[i].firstName == firstName && array[i].lastName1 == lastName1 && array[i].lastName2 == lastName2) {
          return i;
        }
      }
    }

  };

  angular
    .module('sis')
    .controller('maintenanceProfessorsEntryCtrl', maintenanceProfessorsEntryCtrl);
})();
