(function() {

  var examTermService = function($http) {
    var sendExamTerm = function(body) {
      return $http.put(apiBaseRoute + '/api/course-exam-term', body);
    }

    var updateExamTerm = function(body) {
      return $http.post(apiBaseRoute + '/api/course-exam-term', body);
    }

    var getExamTermById = function(idCourseExamTerm) {
      return $http.get(apiBaseRoute + '/api/course-exam-term/' + idCourseExamTerm);
    }

    var getAllExamTerms = function() {
      return $http.get(apiBaseRoute + '/api/course-exam-term');
    }

    var deleteExamTerm = function(idCourseExamTerm) {
      return $http.delete(apiBaseRoute + '/api/course-exam-term/' + idCourseExamTerm);
    }

    return {
      sendExamTerm: sendExamTerm,
      updateExamTerm: updateExamTerm,
      getExamTermById: getExamTermById,
      getAllExamTerms: getAllExamTerms,
      deleteExamTerm: deleteExamTerm
    };
  };

  angular
    .module('sis')
    .service('examTermService', examTermService);
})();