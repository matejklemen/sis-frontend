(function() {

  var professorsService = function($http) {
    var getProfessorData = function(idProfessor) {
      return $http.get(apiBaseRoute + '/api/professors/' + idProfessor);
    };

    var getAllProfessors = function() {
      return $http.get(apiBaseRoute + '/api/professors');
    }

    return {
      getProfessorData: getProfessorData,
      getAllProfessors: getAllProfessors
    };
  };

  angular
    .module('sis')
    .service('professorsService', professorsService);
})();