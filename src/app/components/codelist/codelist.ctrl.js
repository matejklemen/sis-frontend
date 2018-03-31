(function() {
  var codelistCtrl = function($scope, $routeParams, codelistService, $filter) {
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
      vm.currentCodelist = $routeParams.codelistId;

      if(vm.currentCodelist != null) {
        codelistService.getCodelist(vm.currentCodelist).then(
          function success(response) {

            vm.codelistData = response.data;
            vm.codelistCols = Object.keys(vm.codelistData[0]);
            
            vm.codelists.some(function(item) {
              //console.log(item);
              if(item.name == vm.currentCodelist) {
                vm.selectedCodelist = item.displayName;
                return true;
              }
            });

            vm.codelistData.forEach(function(item) {
              //console.log(item);
              if(item.studyDegree) {
                item.studyDegree = $filter('formatStudyDegree')(item.studyDegree);
              }
              if(item.studyPrograms) {
                item.studyPrograms = $filter('formatStudyPrograms')(item.studyPrograms);
              }
            });

            //console.log(vm.codelistCols);
          },
          function error(response) {
            console.error("Oh no... ", response);
          }
        );
      }
    }

  };

  angular
    .module('sis')
    .controller('codelistCtrl', codelistCtrl);
})();