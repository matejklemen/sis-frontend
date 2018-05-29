(function() {
  var enrolmentConformationRequestCtrl = function($scope, exporterService, $timeout) {
    var vm = this;
    vm.toggle = false;
    vm.copies = 1
    vm.successPut = false

    vm.makeRequest = function(){
      exporterService.putRequest($scope.id,vm.copies,"enrolment").then(
        function success(response){
          console.log("Request successfuly placed")
          vm.successPut = true;
          $timeout(function(){
            console.log("notr")
            vm.toggle = false
            vm.successPut = false;
          }, 500)
        },
        function error(error){
          console.log("Oh no...",error)
        }
      )
    }
  };

  angular
    .module('sis')
    .controller('enrolmentConformationRequestCtrl', enrolmentConformationRequestCtrl);
})();