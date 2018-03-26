(function() {
  var passwordCtrl = function($scope, authenticationService, $mdDialog) {
    var vm = this;
    vm.error = false;

    vm.send = function() {
      if(vm.email) {
        authenticationService.passwordReset(vm.email).then(
          function success() {
            console.log("Email sent");
          },
          function error(error) {
            vm.error = true;
            vm.errorMsg = " "+error.status+" "+error.statusText;
        });
      } else {
        vm.error = true;
        vm.errorMsg = "Manjka email...";
      }
    }

    vm.submit = function() {
      if(vm.token && vm.password && vm.passwordRepeat) {
        if(vm.password == vm.passwordRepeat) {
          authenticationService.passwordChange(vm.token, vm.password).then(
            function success(res) {
              console.log("Password changed to: "+ vm.password);
              $mdDialog.hide();
            },
            function error(error) {
              vm.error = true;
              vm.errorMsg = " "+error.status+" "+error.statusText;
          });
        } else {
          vm.error = true;
          vm.errorMsg = "Gesli se ne ujemata...";
        }
      } else {
        vm.error = true;
        vm.errorMsg = "Manjka token ali geslo...";
      }
    }

    vm.close = function() {
      $mdDialog.hide();
    }
  }

  angular
    .module('sis')
    .controller('passwordCtrl', passwordCtrl);
})();
