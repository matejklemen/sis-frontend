(function() {
  var codelistCtrl = function($routeParams, $uibModal, codelistService, $filter) {
    var vm = this;

    // load a list of codelists
    codelistService.getCodelists().then(
      function success(response) {
        vm.codelists = response.data;
        //console.log(vm.codelists);
        loadListIfSelected();
      },
      function error(response) {
        console.error("Oh no... ", response);
      }
    );

    function loadListIfSelected() {
      var codelistId = $routeParams.codelistId;

      // get current selected codelist from the list of codelists
      vm.codelists.some(function(item) {
        if(item.name == codelistId) {
          vm.currentCodelist = item;
          return true;
        }
      });

      if(codelistId != null) {
        codelistService.getCodelist(vm.currentCodelist.endpoint).then(
          function success(response) {
            vm.codelistData = response.data;

            // from the first row, get column names
            vm.codelistCols = Object.keys(vm.codelistData[0]);
            codelistService.getCodelistDeleted(vm.currentCodelist.endpoint).then(
              function success(response) {
                response.data.forEach(function(item, index, array) {
                  item.deleted = true;
                });
                vm.codelistData = vm.codelistData.concat(response.data);
              },
              function error(error) {
                console.error("Oh no... ", response);
              }
            );
          },
          function error(response) {
            console.error("Oh no... ", response);
          }
        );
      }
    }

    vm.openEditEntryModal = function(entry, index) {
      var entryCopy = angular.copy(entry);

      var modalInstance = $uibModal.open({
        templateUrl: 'components/codelist/codelistentry.modalview.html',
        controller: 'codelistEntryCtrl',
        controllerAs: 'vm',
        resolve: {
          resModeEdit: function() {
            return entry;
          },
          // pass values to modal window using "resolve" functions
          resCodelist: function() {
            return vm.currentCodelist;
          }
        }
      });

      // get result from modal after it's closed here
      modalInstance.result.then(
        function(result) {
          if(result == "deleted") {
            // remove deleted entry from list
            //vm.codelistData.splice(index, 1);
            vm.codelistData[index].deleted = true;
          }
          if(result == "restored") {
            // remove deleted entry from list
            //vm.codelistData.splice(index, 1);
            vm.codelistData[index].deleted = false;
          }
          // we are just editing an existing entry, no need to add
          //vm.codelistData.push(result);
        },
        function(closeInfo) {
          // revert any changes to entry when modal is cancelled
          angular.copy(entryCopy, entry);
        }
      );
    };

    vm.openAddEntryModal = function() {
      var modalInstance = $uibModal.open({
        templateUrl: 'components/codelist/codelistentry.modalview.html',
        controller: 'codelistEntryCtrl',
        controllerAs: 'vm',
        resolve: {
          resModeEdit: function() {
            return false;
          },
          // pass values to modal window using "resolve" functions
          resCodelist: function() {
            return vm.currentCodelist;
          }
        }
      });

      // get result from modal after it's closed here
      modalInstance.result.then(
        function(result) {
          vm.codelistData.push(result);
        },
        function(closeInfo) {}
      );
    };

  };

  angular
    .module('sis')
    .controller('codelistCtrl', codelistCtrl);
})();