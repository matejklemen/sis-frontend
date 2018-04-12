
(function() {
  var importCtrl = function($scope, fileService) {
    var vm = this;
    var file = null;

    vm.processData = function($fileContent) {
      file=$fileContent;
      importFile($fileContent);
    };

    vm.hideTable = function(){
      vm.hide = true;
    };

    vm.reimport = function(){
      importFile(file);
    }

    var importFile = function(fileContent){
      vm.status="progress";
      vm.hide = false;
      vm.content = null;
      fileService.putFile(fileContent).then(
        function success(response){
          vm.content = response.data;
          vm.status = "success";
          console.log(response.data)
        },
        function error(error){
          console.log("Error in importCtrl. Message: ", error, status);
          vm.status="error";
        }
      );
    } 
  };

  importCtrl.$inject = ["$scope","fileService"];

  angular
    .module('sis')
    .controller('importCtrl', importCtrl);
})();