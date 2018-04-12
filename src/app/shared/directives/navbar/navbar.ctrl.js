(function() {

  var navbarCtrl = function($window, $location, $route, $scope, authenticationService) {
    var vm = this;

    vm.loggedIn = authenticationService.isLoggedIn();
    if(vm.loggedIn) {
      vm.user = authenticationService.getUsername();
      vm.role = authenticationService.getRole();
    }else{
      if($location.path()!="/login"){
        $window.location.href = "/login";$window.location.href = "/login";
      }
    }
    
    vm.logout = function() {
      authenticationService.logout();
      vm.loggedIn = false;
      $window.location.href = "/login";
    }
  };

  angular
    .module('sis')
    .controller('navbarCtrl', navbarCtrl);
})();
