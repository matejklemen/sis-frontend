(function() {
var loginCtrl = function($scope){
    $scope.msg = "i am login";
};
loginCtrl.$inject = ['$scope'];

angular
    .module('sis')
    .controller('loginCtrl', loginCtrl);
})();