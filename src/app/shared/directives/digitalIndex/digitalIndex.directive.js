(function() {

  var digitalIndexButton = function() {
    return {
      restrict: 'EC',
      scope: {
        id: '=',
      },
      controller: "digitalIndexCtrl",
      controllerAs:'vm',
      templateUrl: "/shared/directives/digitalIndex/digitalIndex.template.html"
    };
  };

  angular
    .module('sis')
    .directive('digitalIndexButton', digitalIndexButton);
})();