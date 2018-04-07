(function() {

  var enrolmentService = function($http) {
    var checkEnrolment = function(id) {
      return $http.head(apiBaseRoute+'/api/enrolments?studentId='+id);
    };

    return {
      checkEnrolment: checkEnrolment,
    };
  };

  angular
    .module('sis')
    .service('enrolmentService', enrolmentService);
})();