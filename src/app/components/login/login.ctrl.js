(function() {
  var loginCtrl = function($scope, authenticationService) {
    var vm = this;
    vm.submitLogin = function() {
      console.log("nice try fam"+ vm.login.username)
    }


  };

  angular
    .module('sis')
    .controller('loginCtrl', loginCtrl);
})();
