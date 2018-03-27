(function() {

  var navbarDirective = function() {
    return {
      restrict: 'EC',
      scope: {
       state: "=",
       filter: "="
      },
      controller: "navbarCtrl",
      controllerAs:'vm',
      templateUrl: "/shared/directives/navbar/navbar.template.html"
    };
  };

  angular
    .module('sis')
    .directive('sisNavbar', navbarDirective);
})();
