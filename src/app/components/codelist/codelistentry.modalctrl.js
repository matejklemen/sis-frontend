(function() {
  var codelistEntryCtrl = function($scope, $uibModalInstance, codelistService, resModeEdit, resCodelist) {
    // if resModeEdit is false, we are adding a new entry.
    // if resModeEdit contains an object, we are editing it!

    var vm = this;

    vm.sendStatus = false;
    
    if(!resModeEdit) {
      vm.entry = {};
    } else {
      vm.entry = resModeEdit;
      vm.editMode = true;
    }

    vm.name = resCodelist.displayName;

    vm.columnNames = resCodelist.columnNames;
    vm.columnTypes = resCodelist.columnTypes;

    vm.columnOptions = {};

    vm.columnTypes.forEach(function(element, index) {
      if(element.length > 2) {
        codelistService.getCodelist(element).then(
          function success(response) {
            vm.columnOptions[element] = response.data;
          },
          function error(response) {
            console.error("Oh no... ", response);
          }
        );
      }
    });

    vm.saveEntry = function() {
      if(!resModeEdit) {
          codelistService.putEntry(resCodelist.endpoint, vm.entry).then(
          function success(response) {
            $uibModalInstance.close(response.data);
          },
          function error(error) {
            vm.sendStatus = error.data;
          }
        );
      } else {
        codelistService.postEntry(resCodelist.endpoint, vm.entry).then(
          function success(response) {
            $uibModalInstance.close(response.data);
          },
          function error(error) {
            vm.sendStatus = error.data;
          }
        );
      }
      
    };

    vm.deleteEntry = function() {
      codelistService.deleteEntry(resCodelist.endpoint, vm.entry).then(
        function success(response) {
          $uibModalInstance.close("deleted");
        },
        function error(error) {
          vm.sendStatus = error.data;
        }
      );
    };

    vm.close = function() {
      $uibModalInstance.dismiss();
    };

  };

  angular
    .module('sis')
    .controller('codelistEntryCtrl', codelistEntryCtrl);
})();
