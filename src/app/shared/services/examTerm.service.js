(function() {

  var examTermService = function($http) {
    var sendExamTerm = function(body){
      return $http.put(apiBaseRoute + '/api/course-exam-term', body);
    }


    return {
      sendExamTerm: sendExamTerm
    };
  };

  angular
    .module('sis')
    .service('examTermService', examTermService);
})();