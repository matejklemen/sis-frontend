(function() {

  var electronicIndexButton = function() {
    return {
      restrict: 'EC',
      scope: {
        id: '=',
      },
      controller: "electronicIndexCtrl",
      controllerAs:'vm',
      templateUrl: "/shared/directives/electronicIndex/electronicIndex.template.html"
    };
  };

  angular
    .module('sis')
    .directive('electronicIndex',electronicIndexButton);
})();