(function () {

  var courseService = function ($http) {

    var getCourseForEnrolment = function (enrolmentId) {
      return $http.get(apiBaseRoute + '/api/courses/enrolment/' + enrolmentId);
    }


    return {
      getCourseForEnrolment: getCourseForEnrolment
    };
  };

  angular
    .module('sis')
    .service('courseService', courseService);
})();