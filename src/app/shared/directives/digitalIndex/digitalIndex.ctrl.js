(function() {
  var digitalIndexCtrl = function($scope, exporterService) {
    var vm = this;

    vm.getDigitalIndexPdf = function(){
      exporterService.getDigitalIndexPdf($scope.id);
    }

    vm.getDigitalIndexCsv = function(){
      exporterService.getDigitalIndexCsv($scope.id);
    }
    

  };

  angular
    .module('sis')
    .controller('digitalIndexCtrl', digitalIndexCtrl);
})();