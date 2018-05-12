(function () {

  var gradeData = function ($http) {

    var getGradeData = function (studentId) {
      return $http.get(apiBaseRoute + '/api/gradeData/' + studentId);
    }


    return {
      getGradeData: getGradeData
    };
  };

  angular
    .module('sis')
    .service('gradeData', gradeData);
})();