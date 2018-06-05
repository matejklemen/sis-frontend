(function() {

  var enrolmentConfirmation = function() {
    return {
      restrict: 'EC',
      scope: {
        id: "=",
        enrolment: "="
      },
      controller: "confirmCtrl",
      controllerAs:'vm',
      templateUrl: "/shared/directives/enrolmentConfirmation/enrolmentConfirmation.template.html"
    };
  };

  angular
    .module('sis')
    .directive('enrolmentConfirmationButton', enrolmentConfirmation);
})();