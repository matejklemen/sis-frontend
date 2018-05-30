(function() {

  var courseOrganizationService = function($http) {

    var getCourseOrganizationsForProfessor = function(idProfessor) {
      return $http.get(apiBaseRoute + '/api/course-organization/professor/' + idProfessor + '?order=course.name ASC');
    };

    var getAllCourseOrganizations = function() {
      var orderPart = '?order=course.name ASC';

      return $http.get(apiBaseRoute + '/api/course-organization' + orderPart);
    };

    var getCourseOrganizationsByStudyYear = function(studyYear) {
      return $http.get(apiBaseRoute + '/api/course-organization/' + studyYear.name.replace("/", ""));
    };

    var postCourseOrganization = function(courseOrganization) {
      return $http.post(apiBaseRoute + '/api/course-organization', courseOrganization);
    };

    return {
      getCourseOrganizationsForProfessor: getCourseOrganizationsForProfessor,
      getAllCourseOrganizations: getAllCourseOrganizations,
      getCourseOrganizationsByStudyYear: getCourseOrganizationsByStudyYear,
      postCourseOrganization: postCourseOrganization
    };
  };

  angular
    .module('sis')
    .service('courseOrganizationService', courseOrganizationService);
})();