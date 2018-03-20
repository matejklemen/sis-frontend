
(function() {
  var mainCtrl = function($scope, fileService) {
    //var parsedData = fileService.parseStudentData($fileContent)

    $scope.processData = function($fileContent) {
      console.log("in mainctrl")
      var response = fileService.putFile($fileContent)
      $scope.content = response;
    };
  };

  mainCtrl.$inject = ["$scope","fileService"];

  angular
    .module('sis')
    .controller('mainCtrl', mainCtrl);
})();
