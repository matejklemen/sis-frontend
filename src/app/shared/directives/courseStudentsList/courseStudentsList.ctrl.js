(function() {
  var courseStudentsListCtrl = function($scope, $routeParams, studentService, enrolmentService, codelistService) {
    var vm = this;

    vm.search = {
      course: "",
      studyYear: "",
      studyProgram : "",
      year: "",
      order: "registerNumber DESC",
    };

    vm.error = {};

    codelistService.getCodelist("courses").then(
      function success(response) {
        vm.courses = response.data;
      },
      function error(error) {
        console.log("Oh no...", error);
      }
    );

    codelistService.getCodelist("studyyears").then(
      function success(response) {
        vm.studyYears = response.data;
        vm.search.studyYear = vm.studyYears[vm.studyYears.length-1];
      },
      function error(error) {
        console.log("Oh no...", error);
      }
    );

    codelistService.getCodelist("studyprograms").then(
      function sucess(response) {
        vm.studyPrograms = response.data;
        vm.studyPrograms.unshift({name: ""});
        vm.search.studyProgram = vm.studyPrograms[0];
      },
      function error(error) {
        cosole.log("Oh no...", error);
      }
    )

    vm.performQuery = function() {
      vm.numberOfStudentsForEachCourse = (typeof vm.search.course !== 'object' || !vm.search.course);

      if(vm.numberOfStudentsForEachCourse) {
        vm.error.studyProgram = (vm.search.studyProgram.name == "" || !vm.search.studyProgram);
        vm.error.year = (!vm.search.year);
      }
      vm.error.studyYear = (vm.search.studyYear == undefined || vm.search.studyYear == "");

      if(vm.error.studyProgram || vm.error.year || vm.error.studyYear) return;

      vm.searched = {
        course: vm.search.course,
        studyYear: vm.search.studyYear,
        studyProgram: vm.search.studyProgram,
        year: vm.search.year 
      };

      vm.error = {};
      vm.queryInProgress = true;

      if(vm.numberOfStudentsForEachCourse) {
        studentService.getNumberOfStudentsForEachCourse({studyYear: vm.search.studyYear, studyProgram: vm.search.studyProgram, year: vm.search.year}).then(
          function success(response) {
            vm.searchResult = response.data;
            console.log(vm.searchResult);
            vm.queryInProgress = false;
          },
          function error(response) {
            console.error("Oh no... ", response);
            vm.queryInProgress = false;
          }
        );
      } else {
        studentService.getByCourse(vm.search).then(
          function success(response) {
            vm.searchResult = response.data;
            vm.queryInProgress = false;
            getEnrolmentTypesForStudents();
          },
          function error(response) {
            console.error("Oh no... ", response);
            vm.queryInProgress = false;
          }
        );
      }
    };

    function getEnrolmentTypesForStudents() {
      vm.searchResult.forEach(function(elem, index) {
        enrolmentService.getEnrolmentsForStudentAndStudyYear(elem.id, vm.search.studyYear.id).then(
          function success(response) {
            elem.enrolment = response.data;
          },
          function error(error) {
            console.log("Woopsie poopsie~~~", error);
          });
      });
    }

  };

  angular
  .module('sis')
  .controller('courseStudentsListCtrl', courseStudentsListCtrl);
})();
