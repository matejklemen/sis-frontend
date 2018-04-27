(function() {
  var examTermsListCtrl = function($scope, $routeParams, examTermService, codelistService) {
    var vm = this;

    vm.search = {
      course: "",
      studyYear: "",
      order: "registerNumber DESC",
    };

    vm.error = {};

    examTermService.getAllExamTerms().then(
      function success(response) {
        vm.searchResult = response.data;
      },
      function error(error) {
        console.log(error);
      });

    vm.deleteCourse = function(id) {
      console.log("Calling deletion of course with ID " + id);
      examTermService.deleteExamTerm(id).then(
        function success(response) {
          console.log(response);
        },
        function error(error) {
          console.log(error);
        });
    };

    // codelistService.getCodelist("courses").then(
    //   function success(response) {
    //     vm.courses = response.data;
    //   },
    //   function error(error) {
    //     console.log("Oh no...", error);
    //   }
    // );

    // codelistService.getCodelist("studyyears").then(
    //   function success(response) {
    //     vm.studyYears = response.data;
    //     vm.search.studyYear = vm.studyYears[vm.studyYears.length-1];
    //   },
    //   function error(error) {
    //     console.log("Oh no...", error);
    //   }
    // );

    // vm.performQuery = function() {
    //   vm.error.course = (typeof vm.search.course !== 'object' || !vm.search.course);
    //   vm.error.studyYear = (vm.search.studyYear == undefined || vm.search.studyYear == "");
      
    //   if(vm.error.course || vm.error.studyYear) return;
  
    //   vm.error = {};
    //   vm.queryInProgress = true;

    //   studentService.getByCourse(vm.search).then(
    //     function success(response) {
    //       vm.searchResult = response.data;
    //       vm.queryInProgress = false;
    //       console.log(vm.searchResult);
    //     },
    //     function error(response) {
    //       console.error("Oh no... ", response);
    //       vm.queryInProgress = false;
    //     }
    //   );
    // };

  };

  angular
  .module('sis')
  .controller('examTermsListCtrl', examTermsListCtrl);
})();
