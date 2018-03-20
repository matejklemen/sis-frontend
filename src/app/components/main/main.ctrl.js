(function() {
  var mainCtrl = function($scope) {
    var vm = this;
    vm.msg = "i am main";
  };

  angular
    .module('sis')
    .controller('mainCtrl', mainCtrl);
})();