(function() {
  var studentExamHistoryCtrl = function($scope, $uibModalInstance, resStudent, resExamTerm, examTermService) {

    var vm = this;

    vm.examTerm = resExamTerm;
    vm.student = resStudent;

    vm.sendStatus = undefined;

    // load history
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

    vm.close = function() {
      $uibModalInstance.dismiss();
    };

  };

  angular
    .module('sis')
    .controller('studentExamHistoryCtrl', studentExamHistoryCtrl);
})();
