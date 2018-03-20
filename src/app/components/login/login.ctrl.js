(function() {
  var loginCtrl = function($scope) {
    var vm = this;
    vm.msg = "i am login";
  };

  angular
    .module('sis')
    .controller('loginCtrl', loginCtrl);
})();