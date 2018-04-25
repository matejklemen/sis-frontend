(function() {

  var navbarCtrl = function($location, $route, $scope, authenticationService) {
    var vm = this;

    vm.loggedIn = authenticationService.isLoggedIn();
    if(vm.loggedIn) {
      vm.user = authenticationService.getUsername();
      vm.role = authenticationService.getRole();
    } else {
      if($location.path() != "/login") {
        $location.path("/login");
      }
    }

    vm.navbarLocation = $location;
    
    vm.logout = function() {
      authenticationService.logout();
      vm.loggedIn = false;
      $location.path("/login");
    };
  };

  angular
    .module('sis')
    .controller('navbarCtrl', navbarCtrl);
})();
