(function() {

  var examTermService = function($http) {
    var sendExamTerm = function(body) {
      return $http.put(apiBaseRoute + '/api/course-exam-term', body);
    };

    var updateExamTerm = function(body) {
      return $http.post(apiBaseRoute + '/api/course-exam-term', body);
    };

    var getExamTermById = function(idCourseExamTerm) {
      return $http.get(apiBaseRoute + '/api/course-exam-term/' + idCourseExamTerm);
    };

    var getAllExamTerms = function(offset, limit, idOrganizer, idStudyYear) {
      // if any of the arguments won't be provided, they will be set to some default value
      offset = offset || 0;
      limit = limit || 0;
      idOrganizer = idOrganizer || 0;
      idStudyYear = idStudyYear || 0;

      if(offset < 0)
        offset = 0;
      if(limit < 0)
        limit = 0;
      if(idOrganizer < 0)
        idOrganizer = 0;
      if(idStudyYear < 0)
        idStudyYear = 0;

      var offsetPart = offset != 0? '&offset=' + offset: '';
      var limitPart = limit != 0? '&limit=' + limit: '';
      var organizerPart = idOrganizer != 0? ' organizer.id:EQ:' + idOrganizer: '';
      var studyYearPart = idStudyYear != 0? ' course.studyYear.id:EQ:' + idStudyYear: '';
      var orderPart = '&order=datetime DESC';

      return $http.get(apiBaseRoute + '/api/course-exam-term?filter=deleted:EQ:false' + organizerPart + studyYearPart + offsetPart + limitPart + orderPart);
    };

    var deleteExamTerm = function(idCourseExamTerm) {
      return $http.delete(apiBaseRoute + '/api/course-exam-term/' + idCourseExamTerm);
    };

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