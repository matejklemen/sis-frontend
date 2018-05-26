(function() {

  var requestsButton = function() {
    return {
      restrict: 'EC',
      scope: {
      },
      controller: "requestsCtrl",
      controllerAs:'vm',
      templateUrl: "/shared/directives/requests/requests.template.html"
    };
  };

  angular
    .module('sis')
    .directive('requests', requestsButton);
})();