(function() {
  var enrTokenCtrl = function($scope, tokenService,$uibModal,enrolmentService) {
    var vm = this;

    vm.studentId = $scope.id;
    vm.enrolmentToken = $scope.token;
    vm.enrolment = $scope.enrolment;

    vm.edit = false;
    vm.editDisable = false;
    vm.currentStudent = undefined;

    //console.log("Token", vm.enrolmentToken);
    //console.log("Enrolment", vm.enrolment);

    if(vm.enrolmentToken) {
      vm.enrolled = true;
      vm.edit = true;
      if(vm.enrolmentToken.used) {
        vm.editDisable = true;

        // ----- getLastEnrolment(vm.studentId);
        if(!vm.enrolment.confirmed) {
          //console.log("ima nepotrjen enrolment,", vm.studentId);
          vm.edit = true;
          vm.editDisable = true;
        } else {
          //console.log("ima potrjen enrolment,", vm.studentId);
          vm.edit = false;
        }
        // -----

      }
      
    } else {
      vm.edit = false;
    }

    vm.NewEnrolmentToken = function(){
      if(vm.enrolled){
        tokenService.putToken(vm.studentId).then(
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
        tokenService.putTokenForFirstEnrolment(vm.studentId).then(
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

  angular
    .module('sis')
    .controller('enrTokenCtrl', enrTokenCtrl);
})();