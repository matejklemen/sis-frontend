(function() {

  var courseOrganizationService = function($http) {

    var getCourseOrganizationsForProfessor = function(idProfessor) {
      return $http.get(apiBaseRoute + '/api/course-organization/professor/' + idProfessor);
    }

    var getAllCourseOrganizations = function() {
      var orderPart = '?order=course.id ASC';

      return $http.get(apiBaseRoute + '/api/course-organization' + orderPart);
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