(function() {
  var codelistCtrl = function($routeParams, $uibModal, codelistService, $filter) {
    var vm = this;

    vm.currentPage = 1;

    // Note for this ctrl: codelistId == vm.currentCodelist.name (not)

    // load a list of codelists
    codelistService.getCodelists().then(
      function success(response) {
        vm.codelists = response.data;
        //console.log(vm.codelists);
        // load list if any is selected
        var codelistId = $routeParams.codelistId;
        getCurrentCodelistMeta(codelistId);
        // load first page of the list ...
        getCodelistDataPage(vm.currentCodelist, vm.currentPage);

      },
      function error(response) {
        console.error("Oh no... ", response);
      }
    );

    function getCurrentCodelistMeta(codelistId) {
      // get current selected codelist from the list of codelists
      vm.codelists.some(function(item) {
        if(item.name == codelistId) {
          vm.currentCodelist = item;
          return true;
        }
      });
    }

    function getCodelistDataPage(currentCodelist, page, searchQuery) {
      if(currentCodelist == undefined) return;

      var limit = 20;
      var offset = (page-1) * limit;

      codelistService.getCodelistAll(currentCodelist.endpoint, offset, limit, searchQuery).then(
        function success(response) {
          vm.codelistData = response.data;
          vm.totalCount = response.headers("X-total-count");

          // from the first row, get column names
          if(vm.codelistData.length > 0)
            vm.codelistCols = Object.keys(vm.codelistData[0]);
        },
        function error(response) {
          console.error("Oh no... ", response);
        }
      );
    }

    vm.changedPage = function() {
      // load a new page of entries
      getCodelistDataPage(vm.currentCodelist, vm.currentPage, vm.searchValue);
    };

    vm.performSearch = function() {
      getCodelistDataPage(vm.currentCodelist, vm.currentPage, vm.searchValue);
    };

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
          result.fresh = true;
          // add on top
          vm.codelistData.unshift(result);
        },
        function(closeInfo) {}
      );
    };

  };

  angular
    .module('sis')
    .controller('codelistCtrl', codelistCtrl);
})();