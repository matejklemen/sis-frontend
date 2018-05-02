
(function() {
  var enrTokenCtrl = function($scope,tokenService,$uibModal,enrolmentService) {
    var vm = this;

    getEnrolmentToken($scope.id);

    vm.edit = false;
    vm.editDisable = false;
    vm.currentStudent = undefined;

    vm.NewEnrolmentToken = function(){
      if(vm.enrolled){
        tokenService.putToken($scope.id).then(
          function success(response){
            vm.enrolmentToken = response.data;
            vm.edit = true;
            vm.editDisable = false;
            console.log("dobil rezultat: ", vm.enrolmentToken);
          },
          function error(error){
            console.log("Error in enrTokenCtrl. Message: ", error);
            vm.enrolmentToken = null;
          }
        );
      }else{
        tokenService.putTokenForFirstEnrolment($scope.id).then(
          function success(response){
            vm.enrolmentToken = response.data;
            vm.edit = true;
            vm.editDisable = false;
            console.log("dobil rezultat: ", vm.enrolmentToken);
          },
          function error(error){
            console.log("Error in enrTokenCtrl. Message: ", error);
            vm.enrolmentToken = null;
          }
        );
      }
    };

    vm.DeleteEnrolmentToken = function(id){
      if (confirm('Ste prepričani da želite izbrisati žeton za vpis?')) {
        tokenService.deleteToken(id).then(
          function success(response){
            console.log("Token was successfully deleted");
            vm.enrolmentToken = null;
            vm.edit = false;
          },
          function error(error){
            console.log("Error while deleting token");
          }
        );
      }
    };


    /* Helpers */
    function getEnrolmentToken(studentId){
      tokenService.getTokenByStudentId(studentId).then(
        function success(response){
          vm.enrolled = true;
          vm.enrolmentToken = response.data;
          if(vm.enrolmentToken.used){
            vm.editDisable = true;
            getLastEnrolment($scope.id);
          }
          vm.edit = true;
        },
        function error(error){
          vm.edit = false;
          //console.log("Oh no...",error);
        }
      );
    }

    function getLastEnrolment(id){
      enrolmentService.getLastEnrolment(id).then(
        function success(response){
          console.log("ima enrolment: ",id," data: ",response.data);
          if(!response.data.confirmed){
            console.log("ima nepotrjen enrolment: ",id);
            vm.edit = true;
            vm.editDisable = true;
          }
          else{
            console.log("ima potrjen enrolment: ",id);
            vm.edit = false;
          }
        },
        function error(error){
          //console.log("Oh no...",error);
        }
      );
    }


    /* Modal */
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

  };

  enrTokenCtrl.$Inject = ["$scope","tokenService"];

  angular
    .module('sis')
    .controller('enrTokenCtrl', enrTokenCtrl);
})();