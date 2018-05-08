(function() {
  var controlCtrl = function($scope, $window, $location, authenticationService) {
    var vm = this;

    vm.role = authenticationService.getRole();

    // redirect to student view if user role is student
    if(vm.role.id == 2) {
      $location.path("/student/" + authenticationService.getIdentity());
    } else {

      // Load selected tab from localstorage - open last tab on view load
      vm.selectedTab = parseInt($window.localStorage.getItem('lastTabIndex'));
    }

    $scope.$watch('vm.selectedTab', function(newVal) {
      $window.localStorage.setItem("lastTabIndex", vm.selectedTab);
    });

  };

  angular
    .module('sis')
    .controller('controlCtrl', controlCtrl);
})();
