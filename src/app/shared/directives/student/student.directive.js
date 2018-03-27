(function() {

  var student = function() {
    return {
      restrict: 'EC',
      scope: {
      },
      controller: "studentCtrl",
      controllerAs:'vm',
      templateUrl: "/shared/directives/student/student.template.html"
    };
  };

  angular
    .module('sis')
    .directive('student', student);
})();