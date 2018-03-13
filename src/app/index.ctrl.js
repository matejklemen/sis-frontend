(function() {
var indexCtrl = function($scope){
    $scope.msg = "i am index";
};
indexCtrl.$inject = ['$scope'];

angular
    .module('spicyapp')
    .controller('indexCtrl', indexCtrl);
})();