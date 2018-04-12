
(function() {
  var controlCtrl = function($scope, fileService,$window, authenticationService) {
    var vm = this;

    vm.role = authenticationService.getRole();
    vm.loginId = authenticationService.getLoginId();

    authenticationService.getUserData(vm.loginId, vm.role.id).then(
      function success(response) {
        if(vm.role.id == 2) {
          $window.location.href = "/student/" + response.data.registerNumber;
        }
      },
      function error(error) {
        console.log("Ooopse poopse~~!", error);
      }
    );

    
  };

  angular
    .module('sis')
    .controller('controlCtrl', controlCtrl);
})();
