(function() {
/* global angular*/

var formatStudyPrograms = function() {
  return function(studyProgramsArray) {
    // if given only one study program, make one element array
    if(!(studyProgramsArray instanceof Array)) {
      studyProgramsArray = [ studyProgramsArray ];
    }

    var str = "";
    studyProgramsArray.forEach(function(e, i) {
      if(i != 0) str += ", ";
      str += e.name;
    });

    return str;
  };
};

  angular
    .module('sis')
    .filter('formatStudyPrograms', formatStudyPrograms);
})();