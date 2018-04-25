(function() {

  var studentService = function($http) {

    /*
      searchObj must have fields:
      - value (search value)
      - order (column name and type to sort by, i.e. "column ASC, column2 DESC")
    */
    var searchStudents = function(searchObj) {
      return $http.get(apiBaseRoute+'/api/students/search/' + searchObj.value + '?order=' + searchObj.order);
    };

    var getByRegisterNumber = function(registerNumber) {
      return $http.get(apiBaseRoute+'/api/students?filter=registerNumber:EQ:' + registerNumber);
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