
(function() {
  var confirmCtrl = function($scope, exporterService, enrolmentService, $window) {
    var vm = this;
   
    vm.enrolment = $scope.enrolment;

    if(vm.enrolment) {
      vm.enrolmentConfirmed = vm.enrolment.confirmed;
    } else {
      vm.enrolmentConfirmed = null;
    }

    vm.viewEnrolmentConformationPdf = function(){
      exporterService.getPdfEnrolmentConformation($scope.id).then(
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