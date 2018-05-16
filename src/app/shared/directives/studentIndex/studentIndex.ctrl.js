(function() {
  var studentIndexCtrl = function($scope, exporterService) {
    var vm = this;

    /* Kartotečn list */
    vm.getIndexCard = function(kind){
      exporterService.getPdfIndex($scope.id, kind ==  'full');
    }

  };

  angular
    .module('sis')
    .controller('studentIndexCtrl', studentIndexCtrl);
})();