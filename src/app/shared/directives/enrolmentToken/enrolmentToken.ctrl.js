
(function() {
  var enrTokenCtrl = function($scope,tokenService,$uibModal) {
    var vm = this;
    
    getEnrolmentToken($scope.id);

    

    vm.currentStudent = undefined;

    vm.NewEnrolmentToken = function(){
      tokenService.putToken($scope.id).then(
        function success(response){
          vm.enrolmentToken = response.data;
          console.log("dobil rezultat: ", vm.content);
        },
        function error(error){
          console.log("Error in enrTokenCtrl. Message: ", error);
          vm.enrolmentToken = null;
        }
      );
    };

    vm.DeleteEnrolmentToken = function(id){
      if (confirm('Ste prepričani da želite izbrisati žeton za vpis?')) {
        tokenService.deleteToken(id).then(
          function success(response){
            console.log("Token was successfully deleted");
            vm.enrolmentToken = null;
          },
          function error(error){
            console.log("Error while deleting token");
          }
        );
      }
    };

    vm.openEditModal = function(enrolmentToken) {
      // create a modal instance and open it
      var modalInstance = $uibModal.open({
        templateUrl: 'shared/directives/enrolmentToken/enrolmentTokenEdit.modalview.html',
        controller: 'enrolmentTokenEditCtrl',
        controllerAs: 'vm',
        resolve: {
          // pass values to modal window using "resolve" functions
          resEnrolmentToken: function() {
            return enrolmentToken;
          }
        }
      });

      // get result from modal after it's closed here
      modalInstance.result.then(
        function(result) {
          console.log("Modal closed with result:", result);
        },
        function(closeInfo) {
          console.log("Modal closed with info:", closeInfo);
        }
      );
    };

    function getEnrolmentToken(studentId){
      tokenService.getTokenByStudentId(studentId).then(
        function success(response){
          vm.enrolmentToken = response.data;
        },
        function error(error){
          vm.enrolmentToken = null;
        }
      );
    }


  };

  enrTokenCtrl.$Inject = ["$scope","tokenService"];

  angular
    .module('sis')
    .controller('enrTokenCtrl', enrTokenCtrl);
})();