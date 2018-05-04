(function() {

  var courseOrganizationService = function($http) {

    var getCourseOrganizationsForProfessor = function(idProfessor) {
      return $http.get(apiBaseRoute + '/api/course-organization/professor/' + idProfessor + '?order=course.name ASC');
    };

    var getAllCourseOrganizations = function() {
      var orderPart = '?order=course.name ASC';

      return $http.get(apiBaseRoute + '/api/course-organization' + orderPart);
    };


    return {
      getCourseOrganizationsForProfessor: getCourseOrganizationsForProfessor,
      getAllCourseOrganizations: getAllCourseOrganizations
    };
  };

  angular
    .module('sis')
    .service('courseOrganizationService', courseOrganizationService);
})();