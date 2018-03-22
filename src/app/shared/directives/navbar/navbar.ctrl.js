(function() {

  var navbarCtrl = function($window, $location, $route, $scope, authenticationService) {
    var vm = this;

    vm.loggedIn = authenticationService.isLoggedIn();
    if(vm.loggedIn) {
      vm.user = authenticationService.getUsername();
    }

    vm.logout = function() {
      authenticationService.logout();
      vm.loggedIn = false;
    }
  };

  angular
    .module('sis')
    .controller('navbarCtrl', navbarCtrl);
})();
