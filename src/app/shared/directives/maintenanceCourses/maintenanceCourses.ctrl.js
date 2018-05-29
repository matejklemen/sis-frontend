(function() {
  var maintenanceCoursesCtrl = function($scope, $window, $filter, $uibModal, curriculumService, codelistService, authenticationService) {
    var vm = this;

    /* Get role */
    vm.role = authenticationService.getRole();
    vm.loginId = authenticationService.getLoginId();

    vm.selection = {
      'studyProgram': null,
      'studyYear': null,
      'yearOfProgram': null
    };

    var storedYearOfProgram = Number($window.localStorage.getItem("maintenanceCoursesSelection.yearOfProgram"));
    if(storedYearOfProgram > 0 && storedYearOfProgram <= 6) {
      vm.selection.yearOfProgram = storedYearOfProgram;
    }

    codelistService.getCodelist("studyprograms").then(
      function success(response) {
        vm.studyPrograms = response.data;

        // automatically select stored selection
        var storedSelection = $window.localStorage.getItem("maintenanceCoursesSelection.studyProgramId");
        if(storedSelection) {
          vm.studyPrograms.some(function(elem, index, array) {
            if(elem.id == storedSelection) {
              vm.selection.studyProgram = elem;
            }
          });
        }
      },
      function error(error) {
        console.log("Nicht gut!", error);
      }
    );

    codelistService.getCodelist("studyyears").then(
      function success(response) {
        vm.studyYears = response.data;
        
        // automatically select stored selection
        var storedSelection = $window.localStorage.getItem("maintenanceCoursesSelection.studyYearId");
        if(storedSelection) {
          vm.studyYears.some(function(elem, index, array) {
            if(elem.id == storedSelection) {
              vm.selection.studyYear = elem;
            }
          });
        }
      },
      function error(error) {
        console.log("Nicht gut!", error);
      }
    );

    codelistService.getCodelist("courses").then(
      function success(response) {
        vm.courses = response.data;
      },
      function error(error) {
        console.log("Nicht gut!", error);
      }
    );

    codelistService.getCodelist("poc").then(
      function success(response) {
        vm.POCs = response.data;
      },
      function error(error) {
        console.log("Nicht gut!", error);
      }
    );

    vm.openCurriculum = function() {
      if(vm.selection.studyYear === null || vm.selection.studyProgram === null || vm.selection.yearOfProgram === null) {
        vm.selectionError = true;
        return;
      }
      // save selection values
      $window.localStorage.setItem("maintenanceCoursesSelection.studyProgramId", vm.selection.studyProgram.id);
      $window.localStorage.setItem("maintenanceCoursesSelection.studyYearId", vm.selection.studyYear.id);
      $window.localStorage.setItem("maintenanceCoursesSelection.yearOfProgram", vm.selection.yearOfProgram);

      vm.selectionError = false;
      vm.hasCurriculum = true;

      console.log(vm.selection);
      curriculumService.getCurriculumWithDeleted(vm.selection.studyYear.name.replace('/', ''), vm.selection.studyProgram.id, vm.selection.yearOfProgram).then(
        function success(response) {
          console.log(response.data);
          vm.curriculum = response.data;
        },
        function error(error) {
          console.log("Nicht gut!", error);
        }
      );
    };

    vm.addCourseToCurriculum = function(course, poc) {
      if(course == null || poc == null) {
        vm.adderError = true;
        return;
      }

      vm.adderError = false;

      curriculumService.insertCurriculum(course, poc, vm.selection.studyProgram, vm.selection.studyYear, vm.selection.yearOfProgram).then(
        function success(response) {
          console.log(response.data);
          vm.curriculum.unshift(response.data);
          vm.adderErrorPopoverIsOpen = false;
          vm.adderErrorPopoverContent = undefined;
          vm.adder.course = undefined; // Remove selected course from adder selection
        },
        function error(error) {
          console.log("Nicht gut!", error);
          if(error.data.messages[0].startsWith("Podvojen ključ")) {
            vm.adderErrorPopoverContent = "Vnos že obstaja.";
          } else {
            vm.adderErrorPopoverContent = "Napaka pri vnosu.";
          }
          vm.adderErrorPopoverIsOpen = true;
        }
      );

    };

    vm.onAdderSelection = function(item, model, label, event) {
      console.log(item, model, label);
    };

    vm.deleteCourseFromCurriculum = function(curriculum) {
      curriculumService.deleteCurriculum(curriculum.id).then(
        function success(response) {
          curriculum.deleted = true;
        },
        function error(error) {
          console.log("Nicht gut!", error);
        }
      );
    };

    vm.undeleteCourseFromCurriculum = function(curriculum) {
      curriculumService.deleteCurriculum(curriculum.id).then(
        function success(response) {
          curriculum.deleted = false;
        },
        function error(error) {
          console.log("Nicht gut!", error);
        }
      );
    };

  };

  angular
  .module('sis')
  .controller('maintenanceCoursesCtrl', maintenanceCoursesCtrl);
})();
