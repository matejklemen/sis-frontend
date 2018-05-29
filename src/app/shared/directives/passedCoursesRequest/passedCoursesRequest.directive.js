(function() {

  var passedCoursesRequestButton = function() {
    return {
      restrict: 'EC',
      scope: {
        id: '=',
      },
      controller: "passedCoursesRequestCtrl",
      controllerAs:'vm',
      templateUrl: "/shared/directives/passedCoursesRequest/passedCoursesRequest.template.html"
    };
  };

  angular
    .module('sis')
    .directive('passedCoursesRequest', passedCoursesRequestButton);
})();