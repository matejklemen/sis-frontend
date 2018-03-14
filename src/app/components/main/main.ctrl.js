(function() {
var mainCtrl = function($scope){
    $scope.msg = "i am main";
};
mainCtrl.$inject = ['$scope'];

angular
    .module('sis')
    .controller('mainCtrl', mainCtrl);
})();