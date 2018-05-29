(function() {
  var passedCoursesCtrl = function($scope, studentCoursesService, studentService, $routeParams) {
    var vm = this;
    vm.id = $routeParams.studentId

    //pridobi id iz urlja (ce je student more biti njegov, 4 in 3 je ok) [!!!!!!!!!!!!]

    studentCoursesService.getPassedCourses($routeParams.studentId).then(
      function success(response){
        console.log(response.data)
        vm.passedCourses = response.data.passedCourses;
        vm.statistics = response.data.statistics;
      },
      function error(error){
        console.log("Oh no...",error)
      }
    );

    studentService.getByStudentId($routeParams.studentId).then(
      function success(response){
        console.log(response.data)
        vm.student = response.data;
      },
      function error(error){
        console.log("Oh no...",error)
      }
    );
  };

  angular
    .module('sis')
    .controller('passedCoursesCtrl', passedCoursesCtrl);
})();