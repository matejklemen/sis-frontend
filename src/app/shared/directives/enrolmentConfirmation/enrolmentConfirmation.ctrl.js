
(function() {
  var confirmCtrl = function($scope, fileService, enrolmentService, $window) {
    var vm = this;
   
    vm.enrolmentConfirmed=null;
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
          //console.log("Oh no...",error);
          vm.enrolmentConfirmed = null;
        }
      );
    }

    vm.viewEnrolmentConformationPdf = function(){
      fileService.getEnrolmentConformation($scope.id).then(
        function success(response){
          var file = new Blob([response.data], {type: 'application/pdf'});
          var fileURL = URL.createObjectURL(file);
          $window.location.href = fileURL;
        },
        function error(error){
          console.log("Oh no...",error);
        }
      );
    };
  };

  angular
    .module('sis')
    .controller('confirmCtrl', confirmCtrl);
})();