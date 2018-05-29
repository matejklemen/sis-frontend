(function() {

  var courseOrganizationService = function($http) {

    var getCourseOrganizationsForProfessor = function(idProfessor) {
      return $http.get(apiBaseRoute + '/api/course-organization/professor/' + idProfessor + '?order=course.name ASC');
    };

    var getAllCourseOrganizations = function() {
      var orderPart = '?order=course.name ASC';

      return $http.get(apiBaseRoute + '/api/course-organization' + orderPart);
    };

    var getCourseOrganizationsByQuery = function(query) {
      var orderPart = '?order=course.name ASC';
      var query = (query.studyYear.id ? '&study_year='+query.studyYear.id : "")+(query.studyProgram.id ? '&study_program='+query.studyProgram.id : "")+(query.year ? '&year='+query.year : "");
      return $http.get(apiBaseRoute + '/api/course-organization' + orderPart+query);
    };


    return {
      getCourseOrganizationsForProfessor: getCourseOrganizationsForProfessor,
      getAllCourseOrganizations: getAllCourseOrganizations,
      getCourseOrganizationsByQuery: getCourseOrganizationsByQuery
    };
  };

  angular
    .module('sis')
    .service('courseOrganizationService', courseOrganizationService);
})();