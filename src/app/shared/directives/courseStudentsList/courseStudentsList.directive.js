(function() {

  var courseStudentsList = function() {
    return {
      restrict: 'EC',
      scope: {
      },
      controller: "courseStudentsListCtrl",
      controllerAs:'vm',
      templateUrl: "/shared/directives/courseStudentsList/courseStudentsList.template.html"
    };
  };

  angular
    .module('sis')
    .directive('courseStudentsList', courseStudentsList);
})();