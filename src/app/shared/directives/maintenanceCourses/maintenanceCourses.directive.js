(function() {

  var maintenanceCourses = function() {
    return {
      restrict: 'EC',
      scope: {
      },
      controller: "maintenanceCoursesCtrl",
      controllerAs:'vm',
      templateUrl: "/shared/directives/maintenanceCourses/maintenanceCourses.template.html"
    };
  };

  angular
    .module('sis')
    .directive('maintenanceCourses', maintenanceCourses);
})();