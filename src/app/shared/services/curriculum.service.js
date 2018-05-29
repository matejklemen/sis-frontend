(function() {

  var curriculumService = function($http) {

    var getCurriculum = function(studyYear, studyProgramId, yearOfProgram) {
      return $http.get(apiBaseRoute+"/api/curriculum/"+studyYear+"/"+studyProgramId+"/"+yearOfProgram+"");
    };

    var getCurriculumWithDeleted = function(studyYear, studyProgramId, yearOfProgram) {
      return $http.get(apiBaseRoute+"/api/curriculum/"+studyYear+"/"+studyProgramId+"/"+yearOfProgram+"?deleted=true");
    };

    var insertCurriculum = function(course, poc, studyProgram, studyYear, yearOfProgram) {
      var obj = {
        idCourse: course,
        poc: poc,
        idStudyProgram: studyProgram,
        studyYear: studyYear,
        yearOfProgram: yearOfProgram
      };
      return $http.put(apiBaseRoute + "/api/curriculum", obj);
    };

    var deleteCurriculum = function(curriculumId) {
      return $http.delete(apiBaseRoute + "/api/curriculum/" + curriculumId);
    };

    return {
      getCurriculum: getCurriculum,
      getCurriculumWithDeleted: getCurriculumWithDeleted,
      insertCurriculum: insertCurriculum,
      deleteCurriculum: deleteCurriculum,
    };
  };

  angular
    .module('sis')
    .service('curriculumService', curriculumService);
})();