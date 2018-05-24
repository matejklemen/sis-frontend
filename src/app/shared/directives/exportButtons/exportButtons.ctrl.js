(function() {
  var exportButtonsCtrl = function($scope, exporterService) {
    var vm = this;

    vm.exportAction = function(action) {
      exporterService.getFile(action, $scope.data, $scope.head, $scope.columnNames, $scope.inLegend, $scope.columnValues);
    };

  };

  angular
    .module('sis')
    .controller('exportButtonsCtrl', exportButtonsCtrl);
})();
