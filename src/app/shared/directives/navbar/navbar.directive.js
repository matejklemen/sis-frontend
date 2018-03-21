(function() {
  /* global angular */
  
  var navbarDirective = function() {
    return {
      restrict: 'EC',
      scope: {
       state: "=",
       filter: "="
      },
      controller: "navbarCtrl",
      controllerAs:'navvm',
      templateUrl: "/shared/directives/navbar/navbar.template.html"
    };
  };
  
  angular
    .module('sis')
    .directive('sisNavbar', navbarDirective);
})(); 
