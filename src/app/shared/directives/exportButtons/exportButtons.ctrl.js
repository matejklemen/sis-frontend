(function() {
  var exportButtonsCtrl = function($scope, exporterService) {
    var vm = this;

    console.log($scope.title);

    vm.exportAction = function(action) {
      exporterService.getFile(action, $scope.data, $scope.title, $scope.columnNames, $scope.columnValues);
    };

  };

  angular
    .module('sis')
    .controller('exportButtonsCtrl', exportButtonsCtrl);
})();