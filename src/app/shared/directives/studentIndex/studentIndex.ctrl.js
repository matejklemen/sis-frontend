(function() {
  var studentIndexCtrl = function($scope, exporterService) {
    var vm = this;

    /* Kartotečn list */
    vm.getIndexCardPdf = function(kind){
      exporterService.getPdfIndexPdf($scope.id, kind ==  'full');
    }

    vm.getIndexCardCsv = function(kind){
      exporterService.getPdfIndexCsv($scope.id, kind ==  'full');
    }

  };

  angular
    .module('sis')
    .controller('studentIndexCtrl', studentIndexCtrl);
})();