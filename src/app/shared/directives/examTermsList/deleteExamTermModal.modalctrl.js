(function() {
  var deleteExamTermModalCtrl = function($scope, $uibModalInstance, resExamTerm, resUserLogin, resUserRole, examTermService) {

    var vm = this;

    vm.examTerm = resExamTerm;
    vm.userLoginId = resUserLogin;
    vm.userRole = resUserRole;

    vm.sendStatus = undefined;

    vm.deleteExamTerm = function() {
      examTermService.deleteExamTerm(vm.examTerm.id).then(
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
    .controller('deleteExamTermModalCtrl', deleteExamTermModalCtrl);
})();
