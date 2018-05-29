(function() {
  /* global angular */

  angular.module('sis', ['ngRoute', 'ngMessages', 'ui.bootstrap']);

  function setup($routeProvider, $locationProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'components/login/login.view.html',
        controller: 'loginCtrl',
        controllerAs: 'vm'
      })
      .when('/control', {
        templateUrl: 'components/control/control.view.html',
        controller: 'controlCtrl',
        controllerAs: 'vm'
      })
      .when('/student/:registerNumber', {
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
      .when('/enrol/:studentId', {
        templateUrl: 'components/enrol/enrol.view.html',
        controller: 'enrolCtrl',
        controllerAs: 'vm'
      })
      .when('/examterm/:examTermId?', {
        templateUrl: 'components/examTerm/examTerm.view.html',
        controller: 'examTermCtrl',
        controllerAs: 'vm'
      })
      .when('/signeduplist/:examTermId', {
        templateUrl: 'components/signedUpList/signedUpList.view.html',
        controller: 'signedUpListCtrl',
        controllerAs: 'vm'
      })
      .when('/agreement/:agreementId?', {
      	templateUrl: 'components/agreement/agreement.view.html',
      	controller: 'agreementCtrl',
      	controllerAs: 'vm'
      })
      .otherwise({redirectTo: '/login'});

    $locationProvider.html5Mode(true);
  }

  angular
    .module('sis')
    .config(['$routeProvider', '$locationProvider', setup]);
})();
