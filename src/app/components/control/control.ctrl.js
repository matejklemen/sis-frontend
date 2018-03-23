
(function() {
  var controlCtrl = function($scope, fileService) {

    $scope.processData = function($fileContent) {
      fileService.putFile($fileContent).then(
        function success(response){
          $scope.content = response.data;
        },
        function error(error){
          console.log("Error in controlCtrl. Message: ", error);
        }
      )
    };
  };

  controlCtrl.$inject = ["$scope","fileService"];

  angular
    .module('sis')
    .controller('controlCtrl', controlCtrl);
})();
