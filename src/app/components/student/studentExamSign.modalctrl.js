(function() {
  var studentExamSignCtrl = function($scope, $uibModalInstance, resAction, resStudent, resExamTerm, examTermService) {

    var vm = this;

    vm.action = resAction;
    vm.examTerm = resExamTerm;
    vm.student = resStudent;

    vm.sendStatus = undefined;

    vm.signup = function() {
      examTermService.putExamSignUp(vm.student.id, vm.examTerm.studentCoursesId, vm.examTerm.id).then(
        function success(response) {
          console.log("Prijava uspešna.");
          $uibModalInstance.close(vm.action);
        },
        function error(error) {
          console.log("Prijava ni uspela, ", error);
          vm.sendStatus = error.data;
        }
      );
    };

    vm.signdown = function() {
      examTermService.returnExamSignUp(vm.examTerm.id, vm.examTerm.studentCoursesId).then(
        function success(response) {
          console.log("Odjava uspešna. ",response.data);
          $uibModalInstance.close(vm.action);
        },
        function error(error) {
          console.log("Odjava ni uspela, ", error);
          vm.sendStatus = error.data;
        }
      );
    };

    vm.close = function() {
      $uibModalInstance.dismiss();
    };

  };

  angular
    .module('sis')
    .controller('studentExamSignCtrl', studentExamSignCtrl);
})();
