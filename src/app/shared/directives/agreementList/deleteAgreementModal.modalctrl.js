(function() {
  var deleteAgreementModalCtrl = function($scope, $uibModalInstance, resAgreement, resUserLogin, resUserRole, agreementService) {

    var vm = this;

    vm.agreement = resAgreement;
    vm.userLoginId = resUserLogin;
    vm.userRole = resUserRole;

    vm.deleteWarning = '';
    vm.sendStatus = undefined;

    vm.deleteAgreement = function() {
      agreementService.deleteAgreement(vm.agreement.idAgreement).then(
        function success(response) {
          $uibModalInstance.close("deleted");
        },
        function error(error) {
          vm.sendStatus = error;
        });
    };

    vm.close = function() {
      $uibModalInstance.dismiss();
    };

  };

  angular
    .module('sis')
    .controller('deleteAgreementModalCtrl', deleteAgreementModalCtrl);
})();
