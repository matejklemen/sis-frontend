
(function() {
  var mainCtrl = function($scope) {
    console.log("in mainCtrl");
  };

  mainCtrl.$inject = ["$scope"];

  angular
    .module('sis')
    .controller('mainCtrl', mainCtrl);
})();
