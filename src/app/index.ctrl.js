(function() {
var indexCtrl = function($scope){
    $scope.msg = "i am index";
};
indexCtrl.$inject = ['$scope'];

angular
    .module('sis')
    .controller('indexCtrl', indexCtrl);
})();