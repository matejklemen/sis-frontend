
(function() {
  var controlCtrl = function($scope, fileService,$window, authenticationService) {
    var vm = this;

    vm.role = authenticationService.getRole();

    if(vm.role.id == 2){
      $window.location.href = "/student/63180006";
    }
  };

  angular
    .module('sis')
    .controller('controlCtrl', controlCtrl);
})();
