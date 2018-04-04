(function() {
  var codelistAddEntryCtrl = function($scope, $uibModalInstance, codelistService, resCodelist) {
    
    var vm = this;
    vm.postStatus = false;
    vm.entry = {};

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

    vm.putEntry = function() {
      console.log(vm.entry);
    };

    vm.close = function() {
      $uibModalInstance.dismiss();
    };

  };

  angular
    .module('sis')
    .controller('codelistAddEntryCtrl', codelistAddEntryCtrl);
})();
