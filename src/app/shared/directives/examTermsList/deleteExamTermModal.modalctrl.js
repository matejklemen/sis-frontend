(function() {
  var deleteExamTermModalCtrl = function($scope, $uibModalInstance, resExamTerm, resUserLogin, resUserRole, examTermService) {

    var vm = this;

    vm.examTerm = resExamTerm;
    vm.userLoginId = resUserLogin;
    vm.userRole = resUserRole;

    vm.deleteWarning = "";
    vm.sendStatus = undefined;

    examTermService.getSignedUpStudentsForExamTerm(vm.examTerm.id).then(
      function success(response) {
        vm.deleteWarning = "Opozorilo: za ta izpitni rok že obstajajo prijave - v primeru, da izbrišete izpitni rok, se bodo izbrisale tudi vse prijave na ta izpitni rok.";
      },
      function error(error) {
        console.log("No students are signed up for selected course exam term...");
      })

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
