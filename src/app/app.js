(function() {
  /* global angular */

  angular.module('sis', ['ngRoute']);

  function setup($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'index/index.view.html',
        controller: 'indexCtrl',
        controllerAs: 'vm'
      })
      .otherwise({redirectTo: '/'});

    $locationProvider.html5Mode(true);
  }

  angular
    .module('sis')
    .config(['$routeProvider', '$locationProvider', setup]);
})();
