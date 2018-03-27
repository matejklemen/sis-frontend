(function() {

  var enrolmentToken = function() {
    return {
      restrict: 'EC',
      scope: {
        id: "="
      },
      controller: "enrTokenCtrl",
      controllerAs:'vm',
      templateUrl: "/shared/directives/enrolmentToken/enrolmentToken.template.html"
    };
  };

  angular
    .module('sis')
    .directive('enrolmentTokenButton', enrolmentToken);
})();