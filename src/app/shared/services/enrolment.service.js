(function() {

  var enrolmentService = function($http) {
    var checkEnrolment = function(id) {
      return $http.head(apiBaseRoute+'/api/enrolments/'+id);
    };

    var getFirstEnrolment = function(id,studyProgramId) {
      return $http.get(apiBaseRoute+'/api/enrolments/'+id+'?order=first&studyProgramId='+studyProgramId);
    };

    return {
      checkEnrolment: checkEnrolment,
      getFirstEnrolment: getFirstEnrolment
    };
  };

  angular
    .module('sis')
    .service('enrolmentService', enrolmentService);
})();