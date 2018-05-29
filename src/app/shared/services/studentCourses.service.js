(function() {

  var studentCoursesService = function($http) {

    var getPassedCourses = function(studentId) {
      return $http.get(apiBaseRoute+'/api/studentcourses/passed/'+studentId);
    };

    
    return {
      getPassedCourses: getPassedCourses,
    };
  };

  angular
    .module('sis')
    .service('studentCoursesService', studentCoursesService);
})();