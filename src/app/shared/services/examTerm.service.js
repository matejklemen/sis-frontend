(function() {

  var examTermService = function($http) {

    var checkEnrolment = function(id) {
      return $http.head(apiBaseRoute+'/api/enrolments/'+id+"?order=last");
    };

    var getLastEnrolment = function(id) {
      return $http.get(apiBaseRoute+'/api/enrolments/'+id+"?order=last");
    };

    var getFirstEnrolment = function(id,studyProgramId) {
      return $http.get(apiBaseRoute+'/api/enrolments/'+id+'?order=first&studyProgramId='+studyProgramId);
    };

    var getEnrolmentsForStudent = function(studentId) {
      return $http.get(apiBaseRoute + '/api/enrolments/' + studentId);
    }

    var updateAndConfirmEnrolment = function(id, body){
      return $http.post(apiBaseRoute + '/api/enrolments/confirm/' + id, body);
    }


    return {
      checkEnrolment: checkEnrolment,
      getFirstEnrolment: getFirstEnrolment,
      getEnrolmentsForStudent: getEnrolmentsForStudent,
      getLastEnrolment: getLastEnrolment,
      updateAndConfirmEnrolment: updateAndConfirmEnrolment
    };
  };

  angular
    .module('sis')
    .service('examTermService', examTermService);
})();