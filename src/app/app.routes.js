(function() {
  /* global angular */

  angular.module('sis', ['ngRoute', 'ngMaterial', 'ngMessages']);

  function setup($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'components/main/main.view.html',
        controller: 'mainCtrl',
        controllerAs: 'vm'
      })
      .when('/login', {
        templateUrl: 'components/login/login.view.html',
        controller: 'loginCtrl',
        controllerAs: 'vm'
      })
      .when('/student', {
        templateUrl: 'components/student/studentlist.view.html',
        controller: 'studentCtrl',
        controllerAs: 'vm'
      })
      .when('/control', {
        templateUrl: 'components/control/control.view.html',
        controller: 'controlCtrl',
        controllerAs: 'vm'
      })
      .when('/student/:studentId', {
        templateUrl: 'components/student/student.view.html',
        controller: 'studentCtrl',
        controllerAs: 'vm'
      })
      .otherwise({redirectTo: '/'});

    $locationProvider.html5Mode(true);
  }

  angular
    .module('sis')
    .config(['$routeProvider', '$locationProvider', setup]);
})();
