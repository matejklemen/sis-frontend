(function() {
  var electronicIndexCtrl = function($scope, $window) {
    var vm = this;

    vm.gotoIndex = function(){
      $window.location.href = "passedCourses/" + $scope.id
    }

  };

  angular
    .module('sis')
    .controller('electronicIndexCtrl', electronicIndexCtrl);
})();