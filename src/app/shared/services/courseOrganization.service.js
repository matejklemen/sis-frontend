(function() {

  var courseOrganizationService = function($http) {

    var getCourseOrganizationsForProfessor = function(idProfessor) {
      return $http.get(apiBaseRoute + '/api/course-organization/professor/' + idProfessor);
    }


    return {
      getCourseOrganizationsForProfessor: getCourseOrganizationsForProfessor
    };
  };

  angular
    .module('sis')
    .service('courseOrganizationService', courseOrganizationService);
})();