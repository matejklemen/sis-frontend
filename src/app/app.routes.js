(function() {
  /* global angular */

  angular.module('sis', ['ngRoute', 'ngMaterial', 'ngMessages']);

  function setup($routeProvider, $locationProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'components/login/login.view.html',
        controller: 'loginCtrl',
        controllerAs: 'vm'
      })
      .when('/', {
        templateUrl: 'components/control/control.view.html',
        controller: 'controlCtrl',
        controllerAs: 'vm'
      })
      
      .when('/student', {
        redirectTo: '/control'
      })
      .when('/student/:studentId', {
        templateUrl: 'components/student/student.view.html',
        controller: 'studentCtrl',
        controllerAs: 'vm'
      })

      .when('/codelist', {
        templateUrl: 'components/codelist/codelist.view.html',
        controller: 'codelistCtrl',
        controllerAs: 'vm'
      })
      .when('/codelist/:codelistId', {
        templateUrl: 'components/codelist/codelist.view.html',
        controller: 'codelistCtrl',
        controllerAs: 'vm'
      })

      .otherwise({redirectTo: '/'});

    $locationProvider.html5Mode(true);
  }

  angular
    .module('sis')
    .config(['$routeProvider', '$locationProvider', setup]);
})();
