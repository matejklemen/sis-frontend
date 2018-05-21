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
      vm.error.course = (typeof vm.search.course !== 'object' || !vm.search.course);
      vm.error.studyYear = (vm.search.studyYear == undefined || vm.search.studyYear == "");

      vm.searched = {
        course: vm.search.course,
        studyYear: vm.search.studyYear,
        studyProgram: vm.search.studyProgram,
        year: vm.search.year
      };

      if(vm.error.course || vm.error.studyYear) return;

      vm.error = {};
      vm.queryInProgress = true;

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
