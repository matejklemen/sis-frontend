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

    /*
      searchObj must have fields:
      - course (course object)
      - studyYear (study year object)
      - order (column name and type to sort by, i.e. "column ASC, column2 DESC")
      searchObj optional fields:
      - studyProgram (study program object)
      - year (integer 1 >= x <= 3)
    */
    var getByCourse = function(searchObj) {
      return $http.get(apiBaseRoute+'/api/students/enrolled?course=' + searchObj.course.id + '&study_year=' + searchObj.studyYear.id +(searchObj.studyProgram.name != "" ? '&study_program='+ searchObj.studyProgram.id : '')+(searchObj.year != "" ? '&year='+ searchObj.year : '')+ '&order=' + searchObj.order);
    };

    var getNumberOfStudentsForEachCourse = function(searchObj) {
      return $http.get(apiBaseRoute+'/api/students/countbycourses?study_year=' + searchObj.studyYear.id + '&study_program=' + searchObj.studyProgram.id + '&year=' + searchObj.year);
    };

    var getByRegisterNumber = function(registerNumber) {
      return $http.get(apiBaseRoute+'/api/students?filter=registerNumber:EQ:' + registerNumber);
    };

    var getByStudentId = function(studentId) {
      return $http.get(apiBaseRoute + '/api/students/' + studentId);
    };

    var getEnrolledForCurrentYear = function() {
      return $http.get(apiBaseRoute + '/api/students/currently-enrolled');
    }

    return {
      searchStudents: searchStudents,
      getByRegisterNumber: getByRegisterNumber,
      getByStudentId: getByStudentId,
      getByCourse: getByCourse,
      getNumberOfStudentsForEachCourse: getNumberOfStudentsForEachCourse,
      getEnrolledForCurrentYear: getEnrolledForCurrentYear
    };
  };

  angular
    .module('sis')
    .service('studentService', studentService);
})();
