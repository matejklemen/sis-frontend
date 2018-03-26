(function() {
  var loginCtrl = function($scope, $location, $route, authenticationService, $mdDialog) {
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
        vm.errorMsg = "Manjkata uporabniško ime ali geslo...";
      }
    }

    vm.showPasswordRecover = function(ev) {
      $mdDialog.show({
        controller: 'passwordCtrl',
        templateUrl: 'components/login/password.view.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: $scope.customFullscreen,
        controllerAs: 'vm'
      }).then(function(answer) {
        $scope.status = 'You said the information was "' + answer + '".';
      }, function() {
        $scope.status = 'You cancelled the dialog.';
      });


    };
  };

  angular
    .module('sis')
    .controller('loginCtrl', loginCtrl);
})();
