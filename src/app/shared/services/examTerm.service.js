(function() {

  var examTermService = function($http) {
    var sendExamTerm = function(body) {
      return $http.put(apiBaseRoute + '/api/course-exam-term', body);
    }

    var getExamTermById = function(idCourseExamTerm) {
      return $http.get(apiBaseRoute + '/api/course-exam-term/' + idCourseExamTerm);
    }

    return {
      sendExamTerm: sendExamTerm,
      getExamTermById: getExamTermById
    };
  };

  angular
    .module('sis')
    .service('examTermService', examTermService);
})();