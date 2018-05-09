(function() {
  var studentExamSignCtrl = function($scope, $uibModalInstance, resAction, resStudent, resExamTerm, examTermService, authenticationService) {

    var vm = this;

    vm.action = resAction;
    vm.examTerm = resExamTerm;
    vm.student = resStudent;

    vm.sendStatus = undefined;

    if(vm.action == "history"){
      history();
    }

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
      id = authenticationService.getLoginId()
      examTermService.returnExamSignUp(vm.examTerm.id, vm.examTerm.studentCoursesId, id).then(
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

    function history () {
      examTermService.getExamSignUpHistory(vm.examTerm.id, vm.examTerm.studentCoursesId).then(
        function success(response) {
          console.log("Zgodovina. ",response.data);
          vm.history = response.data;
        },
        function error(error) {
          console.log("Oh no...", error);
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
