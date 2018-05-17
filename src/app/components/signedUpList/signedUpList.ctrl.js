(function() {
  var signedUpListCtrl = function($scope, $routeParams, $location, authenticationService, examTermService) {
    var vm = this;

    vm.editMode = false;

    if(!$routeParams.examTermId) {
      $location.path("/control");
    }

    vm.role = authenticationService.getRole();
    vm.identity = authenticationService.getIdentity();
    vm.loginId = authenticationService.getLoginId();

    examTermService.getExamTermById($routeParams.examTermId).then(
      function success(response) {
        vm.examTerm = response.data;
        // if the examterm is valid, we can't set grades yet
        vm.examTerm.isValid = new Date(vm.examTerm.datetime) - Date.now() >= 0;
        console.log(vm.examTerm);
      },
      function error(error) {
        console.log("Mon dieu", error);
      }
    );

    examTermService.getSignedUpStudentsForExamTerm($routeParams.examTermId).then(
      function success(response) {
        vm.studentsList = response.data;
        console.log(vm.studentsList);
      },
      function error(error) {
        console.log("Mon dieu", error);
      }
    );

    vm.toggleEditMode = function() {
      vm.editMode = !vm.editMode;

      vm.studentsList.forEach(function(elem, index, array) {
        elem.posted = undefined;
      });
    };

    vm.postGrades = function() {
      vm.studentsList.forEach(function(elem, index, array) {
        var writtenScore = elem.currentGrade || '';
        var suggestedGrade = elem.finalGrade || '';
        elem.posted = undefined;
        examTermService.postGradesForExamSignUp(elem.idExamSignUp, writtenScore, suggestedGrade).then(
          function success(response) {
            elem.posted = true;
          },
          function error(error) {
            console.log("Mon dieu", error);
            elem.posted = true;
          }
        );
      });
    };
    
  };

  angular
    .module('sis')
    .controller('signedUpListCtrl', signedUpListCtrl);
})();