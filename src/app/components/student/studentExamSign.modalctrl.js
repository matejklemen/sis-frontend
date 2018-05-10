(function() {
  var studentExamSignCtrl = function($scope, $uibModalInstance, resAction, resStudent, resExamTerm, resUserLogin, resUserRole, examTermService) {

    var vm = this;

    vm.action = resAction;
    vm.examTerm = resExamTerm;
    vm.student = resStudent;
    vm.userLoginId = resUserLogin;
    vm.userRole = resUserRole;

    vm.sendStatus = undefined;

    if(vm.action == "history"){
      history();
    }

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
        }
      );
    };

    vm.signupforce = function() {
      examTermService.putExamSignUp(vm.student.id, vm.examTerm.studentCoursesId, vm.examTerm.id, vm.userLoginId, true).then(
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
      examTermService.returnExamSignUp(vm.examTerm.id, vm.examTerm.studentCoursesId, vm.userLoginId).then(
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

      examTermService.getExamSignUpForCourse(vm.student.id, vm.examTerm.courseOrganization.course.id).then(
        function success(response) {
          console.log("Pretekle prijave. ",response.data);
          vm.signups = response.data;
        },
        function error(error) {
          console.log("Oh no...", error);
        }
      );
    }

    vm.close = function() {
      $uibModalInstance.dismiss();
    };

  };

  angular
    .module('sis')
    .controller('studentExamSignCtrl', studentExamSignCtrl);
})();
