(function() {
  var passedCoursesCtrl = function($scope, studentCoursesService, studentService, $routeParams) {
    var vm = this;
    vm.id = $routeParams.studentId

    //pridobi id iz urlja (ce je student more biti njegov, 4 in 3 je ok) [!!!!!!!!!!!!]

    studentCoursesService.getPassedCourses($routeParams.studentId).then(
      function success(response){
        console.log(response.data)
        vm.DigitalIndex = response.data.indexList;
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

    vm.sum = function(stats){
      var sum = 0;
      var count = 0;
      for(var i = 0; i < stats.length; i++){
        if(stats[i].avg <= 0)
          continue;
        count++;
        sum += stats[i].avg
      }
      return Math.round(sum/count * 100) / 100;
    }
  };

  angular
    .module('sis')
    .controller('passedCoursesCtrl', passedCoursesCtrl);
})();