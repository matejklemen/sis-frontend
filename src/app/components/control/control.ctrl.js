(function() {
  var controlCtrl = function($scope, $window, fileService, $location, authenticationService) {
    var vm = this;

    vm.role = authenticationService.getRole();

    // redirect to student view if user role is student
    if(vm.role.id == 2) {
      $location.path("/student/" + authenticationService.getIdentity());
    } else {

      // Load selected tab from localstorage - open last tab on view load
      vm.selectedTab = parseInt($window.localStorage.getItem('lastTabIndex'));
    }

    vm.saveSelectedTab = function(selectedIndex) {
      $window.localStorage.setItem("lastTabIndex", selectedIndex);
    };

  };

  angular
    .module('sis')
    .controller('controlCtrl', controlCtrl);
})();
