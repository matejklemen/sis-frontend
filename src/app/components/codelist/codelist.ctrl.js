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

      if(codelistId != null) {
        codelistService.getCodelist(codelistId).then(
          function success(response) {

            // get current selected codelist from the list of codelists
            vm.codelists.some(function(item) {
              if(item.name == codelistId) {
                vm.currentCodelist = item;
                return true;
              }
            });

            vm.codelistData = response.data;

            // from the first row, get column names
            vm.codelistCols = Object.keys(vm.codelistData[0]);

            // fix study degree & study program formatting
            vm.codelistData.forEach(function(item) {
              if(item.studyDegree) {
                item.studyDegree = $filter('formatStudyDegree')(item.studyDegree);
              }
              if(item.studyPrograms) {
                item.studyPrograms = $filter('formatStudyPrograms')(item.studyPrograms);
              }
            });

          },
          function error(response) {
            console.error("Oh no... ", response);
          }
        );
      }
    }

    vm.openAddEntryModal = function() {
      var modalInstance = $uibModal.open({
        templateUrl: 'components/codelist/codelistaddentry.modalview.html',
        controller: 'codelistAddEntryCtrl',
        controllerAs: 'vm',
        resolve: {
          // pass values to modal window using "resolve" functions
          resCodelist: function() {
            return vm.currentCodelist;
          }
        }
      });

      // get result from modal after it's closed here
      modalInstance.result.then(
        function(result) {},
        function(closeInfo) {}
      );
    };

  };

  angular
    .module('sis')
    .controller('codelistCtrl', codelistCtrl);
})();