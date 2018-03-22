(function() {
  var loginCtrl = function($scope, $location, $route, authenticationService) {
    var vm = this;
    vm.error = false;

    if(authenticationService.isLoggedIn()) {
      $location.path("/");
    }

    vm.submitLogin = function() {
      if(vm.username && vm.password) {
        authenticationService.login(vm.username, vm.password).then(
          function success(userId) {
            $location.path("/");
            $route.reload();
          },
          function error(error) {
            vm.error = true;
            vm.errorMsg = " "+error.status+" "+error.statusText;
        });
      } else {
        vm.error = true;
        vm.errorMsg = "Username or password missing.";
      }

    }


  };

  angular
    .module('sis')
    .controller('loginCtrl', loginCtrl);
})();
