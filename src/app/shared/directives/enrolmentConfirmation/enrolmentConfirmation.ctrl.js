
(function() {
  var confirmCtrl = function($scope, fileService, enrolmentService, $window) {
    var vm = this;
   
    vm.enrolmentConfirmed=false;
    vm.enrolment;

    checkIfValidEnrolment();


    /* Methods */
    function checkIfValidEnrolment(){
      enrolmentService.getLastEnrolment($scope.id).then(
        function success(response){
          vm.enrolmentConfirmed = response.data.confirmed;
          vm.enrolment = response.data;
          console.log(response.data);
        },
        function error(error){
          console.log("Oh no...",error);
          vm.enrolmentConfirmed = null;
        }
      );
    }

    vm.confirmEnrolment = function(){
      if(confirm("Ste prepričani, da želite potrditi vpis?")){
        enrolmentService.postConfirmeEnrolment(vm.enrolment.id).then(
          function success(response){
            console.log("posted confirmed enrolmnet: ",response.data)
            vm.enrolmentConfirmed=true;
          },
          function error(error){
            console.log("Oh no...",error)
          }
        );
      }
    }

    vm.viewEnrolmentPdf = function(){
      $window.location.href = "/enrol-pdf/123"
    }
   
  };

  angular
    .module('sis')
    .controller('confirmCtrl', confirmCtrl);
})();