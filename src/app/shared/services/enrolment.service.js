(function() {

  var enrolmentService = function($http) {
    var checkEnrolment = function(id) {
      return $http.head(apiBaseRoute+'/api/enrolments/'+id);
    };

    var getLastEnrolment = function(id) {
      return $http.get(apiBaseRoute+'/api/enrolments/'+id);
    };

    var getFirstEnrolment = function(id,studyProgramId) {
      return $http.get(apiBaseRoute+'/api/enrolments/'+id+'?order=first&studyProgramId='+studyProgramId);
    };

    var getEnrolmentsForStudent = function(studentId) {
      return $http.get(apiBaseRoute + '/api/enrolments/' + studentId);
    }

    return {
      checkEnrolment: checkEnrolment,
      getFirstEnrolment: getFirstEnrolment,
      getEnrolmentsForStudent: getEnrolmentsForStudent,
      getLastEnrolment: getLastEnrolment
    };
  };

  angular
    .module('sis')
    .service('enrolmentService', enrolmentService);
})();