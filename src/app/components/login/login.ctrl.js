(function() {
  var loginCtrl = function($scope, $location, $route, authenticationService, $uibModal) {
    var vm = this;
    vm.error = false;

    if(authenticationService.isLoggedIn()) {
      $location.path("/control");
    }

    vm.submitLogin = function() {
      if(vm.username && vm.password) {
        authenticationService.login(vm.username, vm.password).then(
          function success(userId) {
            $location.path("/control");
            $route.reload();
          },
          function error(error) {
            vm.error = true;
            vm.errorMsg = " "+error.status+" "+error.statusText;
        });
      } else {
        vm.error = true;
        vm.errorMsg = "Manjkata uporabniško ime ali geslo...";
      }
    };

    vm.showPasswordRecover = function() {
      var modalInstance = $uibModal.open({
        templateUrl: '/components/login/password.modalview.html',
        controller: 'passwordCtrl',
        controllerAs: 'vm',
      });

      modalInstance.result.then(
        function(result) {
          console.log("Modal closed with result:", result);
        },
        function(closeInfo) {
          console.log("Modal closed with info:", closeInfo);
        }
      );
      
    };
  };

  angular
    .module('sis')
    .controller('loginCtrl', loginCtrl);
})();
