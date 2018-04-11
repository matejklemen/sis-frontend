(function() {

  var studentService = function($http) {

    var searchStudents = function(searchValue) {
      return $http.get(apiBaseRoute+'/api/students/search/' + searchValue);
    };

    var getByRegisterNumber = function(registerNumber) {
      return $http.get(apiBaseRoute+'/api/students/s/' + registerNumber);
    };

    var getByStudentId = function(studentId) {
      return $http.get(apiBaseRoute + '/api/students/' + studentId);
    };

    return {
      searchStudents: searchStudents,
      getByRegisterNumber: getByRegisterNumber,
      getByStudentId: getByStudentId,
    };
  };

  angular
    .module('sis')
    .service('studentService', studentService);
})();