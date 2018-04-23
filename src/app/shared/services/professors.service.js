(function() {

  var professorsService = function($http) {
    var getProfessorData = function(idProfessor) {
      return $http.get(apiBaseRoute + '/api/professors/' + idProfessor);
    };

    return {
      getProfessorData: getProfessorData
    };
  };

  angular
    .module('sis')
    .service('professorsService', professorsService);
})();