(function() {
  var studentExamSignCtrl = function($scope, $uibModalInstance, resAction, resStudent, resExamTerm, resUserLogin, resUserRole, examTermService) {

    var vm = this;

    vm.action = resAction;
    vm.examTerm = resExamTerm;
    vm.student = resStudent;
    vm.userLoginId = resUserLogin;
    vm.userRole = resUserRole;

    vm.sendStatus = undefined;
    vm.allowForce = false;

    vm.signup = function() {
      examTermService.putExamSignUp(vm.student.id, vm.examTerm.studentCoursesId, vm.examTerm.id, vm.userLoginId).then(
        function success(response) {
          console.log("Prijava uspešna.", response.data);
          vm.examTerm.confirmed = response.data.confirmed; // TODO: move that to modal result for clearer code
          $uibModalInstance.close(vm.action);
        },
        function error(error) {
          console.log("Prijava ni uspela, ", error);
          vm.sendStatus = error.data;
          if(vm.userRole.id == 4){
            vm.allowForce = true;
          }
        }
      );
    };

    vm.signupforce = function() {
      examTermService.putExamSignUp(vm.student.id, vm.examTerm.studentCoursesId, vm.examTerm.id, vm.userLoginId, true).then(
        function success(response) {
          console.log("Prijava uspešna.", response.data);
          vm.examTerm.confirmed = response.data.confirmed; // TODO: move that to modal result for clearer code
          $uibModalInstance.close(vm.action);
        },
        function error(error) {
          console.log("Prijava ni uspela, ", error);
          vm.sendStatus = error.data;
          vm.allowForce = false;
        }
      );
    };

    vm.signdown = function(force) {
      examTermService.returnExamSignUp(vm.examTerm.id, vm.examTerm.studentCoursesId, vm.userLoginId, force).then(
        function success(response) {
          console.log("Odjava uspešna. ",response.data);
          $uibModalInstance.close(vm.action);
        },
        function error(error) {
          console.log("Odjava ni uspela, ", error);
          if(!force && vm.userRole.id == 4){
            vm.allowForce = true;
          }else{
            vm.allowForce = false;
          }
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
