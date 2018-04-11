(function() {

  var curriculumService = function($http) {

    var getCurriculum = function(studyYear, studyProgramId, yearOfProgram) {
      return $http.get(apiBaseRoute+"/api/curriculum/"+studyYear+"/"+studyProgramId+"/"+yearOfProgram);
    };

    return {
      getCurriculum: getCurriculum,
    };
  };

  angular
    .module('sis')
    .service('curriculumService', curriculumService);
})();