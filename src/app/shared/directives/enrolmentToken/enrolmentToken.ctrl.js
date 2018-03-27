
(function() {
  var enrTokenCtrl = function($scope,tokenService) {
    var vm = this;
      
    vm.NewEnrolmentToken = function(){
      tokenService.putToken($scope.id).then(
        function success(response){
          vm.content = response.data;
          console.log("dobil rezultat: "+vm.content);
          vm.status = "success";
        },
        function error(error){
          console.log("Error in enrTokenCtrl. Message: ", error);
          vm.status="error";
        }
      );
    }
  };

  enrTokenCtrl.$Inject = ["$scope","tokenService"]

  angular
    .module('sis')
    .controller('enrTokenCtrl', enrTokenCtrl);
})();