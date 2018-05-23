(function() {
  var signedUpListCtrl = function($scope, $routeParams, $location, $filter, authenticationService, examTermService) {
    var vm = this;

    if(!$routeParams.examTermId) {
      $location.path("/control");
    }

    vm.editMode = ($routeParams.edit !== undefined);

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
        $location.path("/control");
      }
    );

    getSignedUpStudents();

    function getSignedUpStudents() {
      examTermService.getSignedUpStudentsForExamTerm($routeParams.examTermId).then(
        function success(response) {
          vm.studentsList = response.data;
          vm.studentsListCopy = JSON.parse(JSON.stringify(response.data));
          console.log(vm.studentsList);
        },
        function error(error) {
          console.log("Mon dieu, ni študentov?", error);
          vm.studentsList = [];
        }
      );
    }

    vm.toggleEditMode = function() {
      vm.editMode = !vm.editMode;
      if(!vm.editMode) {
        vm.studentsList.forEach(function(elem, index, array) {
          // if it wasn't successfuly posted, reset it
          if(!elem.posted) {
            elem.writtenScore = vm.studentsListCopy[index].writtenScore;
            elem.suggestedGrade = vm.studentsListCopy[index].suggestedGrade;
            elem.returned = vm.studentsListCopy[index].returned;
          } else {
            vm.studentsListCopy[index].writtenScore = elem.writtenScore;
            vm.studentsListCopy[index].suggestedGrade = elem.suggestedGrade;
            vm.studentsListCopy[index].returned = elem.returned;
          }
          if(elem.returned) {
            elem.writtenScore = null;
            elem.suggestedGrade = null;
          }
          elem.posted = undefined;
          elem.dirty = undefined;
        });
      }
    };

    vm.postGrades = function() {
      vm.studentsList.forEach(function(elem, index, array) {
        if(elem.dirty) {
          elem.posted = undefined;
          examTermService.postGradesForExamSignUp(elem.idExamSignUp, vm.loginId, elem.writtenScore || '', elem.suggestedGrade || '', elem.returned || false).then(
            function success(response) {
              elem.posted = true;
              elem.errors = undefined;
              elem.dirty = undefined;
            },
            function error(error) {
              console.log("Mon dieu", error);
              elem.errors = $filter('formatError')(error.data);
              elem.posted = false;
            }
          );
        }
      });
    };

    vm.toggleReturned = function(listElem) {
      listElem.returned = !listElem.returned;
      listElem.writtenScore = '';
      listElem.suggestedGrade = '';
      listElem.dirty = true;
    };
    
  };

  angular
    .module('sis')
    .controller('signedUpListCtrl', signedUpListCtrl);
})();