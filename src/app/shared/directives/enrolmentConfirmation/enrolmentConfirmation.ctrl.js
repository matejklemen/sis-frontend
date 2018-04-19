
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

    vm.viewEnrolmentPdf = function(){
      //get pdf and set to path
      fileService.getFile().then(
        function success(response){
          var blob = new Blob([response.data], {type: "application/pdf;charset=utf-8"});
          console.log(response.data)
          FileSaver.saveAs(blob, 'contract.pdf');
        },
        function error(error){
          console.log("Oh no...",error)
        }
      );
      $window.location.href = "/enrol-pdf/123"
    }
   
  };

  angular
    .module('sis')
    .controller('confirmCtrl', confirmCtrl);
})();