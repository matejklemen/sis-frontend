(function() {

  var enrolmentService = function($http) {
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
    };

    var getEnrolmentsForStudentAndStudyYear = function(studentId, studyYearId) {
      return $http.get(apiBaseRoute + '/api/enrolments/' + studentId + '?studyYearId=' + studyYearId);
    };

    var updateAndConfirmEnrolment = function(id, body){
      return $http.post(apiBaseRoute + '/api/enrolments/confirm/' + id, body);
    };


    return {
      checkEnrolment: checkEnrolment,
      getLastEnrolment: getLastEnrolment,
      getFirstEnrolment: getFirstEnrolment,
      getEnrolmentsForStudent: getEnrolmentsForStudent,
      getEnrolmentsForStudentAndStudyYear: getEnrolmentsForStudentAndStudyYear,
      updateAndConfirmEnrolment: updateAndConfirmEnrolment
    };
  };

  angular
    .module('sis')
    .service('enrolmentService', enrolmentService);
})();