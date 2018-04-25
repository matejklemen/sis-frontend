(function() {

  var courseOrganizationService = function($http) {

    var getCourseOrganizationsForProfessor = function(idProfessor) {
      return $http.get(apiBaseRoute + '/api/course-organization/professor/' + idProfessor);
    }

    var getAllCourseOrganizations = function() {
      return $http.get(apiBaseRoute + '/api/course-organization');
    }


    return {
      getCourseOrganizationsForProfessor: getCourseOrganizationsForProfessor,
      getAllCourseOrganizations: getAllCourseOrganizations
    };
  };

  angular
    .module('sis')
    .service('courseOrganizationService', courseOrganizationService);
})();