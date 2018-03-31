(function() {
/* global angular*/

var formatStudyDegree = function() {
  return function(studyDegreeObject) {
    if(!studyDegreeObject) return "/";
    return studyDegreeObject.name;
  };
};

  angular
    .module('sis')
    .filter('formatStudyDegree', formatStudyDegree);
})();