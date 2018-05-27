(function() {

  var enrolmentConformationRequestButton = function() {
    return {
      restrict: 'EC',
      scope: {
        id: '=',
        enroled: "=",
      },
      controller: "enrolmentConformationRequestCtrl",
      controllerAs:'vm',
      templateUrl: "/shared/directives/enrolmentConformationRequest/enrolmentConformationRequest.template.html"
    };
  };

  angular
    .module('sis')
    .directive('enrolmentConformationRequest', enrolmentConformationRequestButton);
})();