(function() {

  var maintenanceProfessors = function() {
    return {
      restrict: 'EC',
      scope: {
      },
      controller: "maintenanceProfessorsCtrl",
      controllerAs:'vm',
      templateUrl: "/shared/directives/maintenanceProfessors/maintenanceProfessors.template.html"
    };
  };

  angular
    .module('sis')
    .directive('maintenanceProfessors', maintenanceProfessors);
})();