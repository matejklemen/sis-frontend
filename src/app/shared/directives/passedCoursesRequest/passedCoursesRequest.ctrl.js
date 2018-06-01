(function() {
  var passedCoursesRequestCtrl = function($scope, exporterService, $timeout) {
    var vm = this;

    vm.toggle = false;
    vm.copies = 1
    vm.statusInput = "";
    vm.statusButton = "btn-primary";

    var successInput = "has-success"
    var successButton = "btn-success"
    var errorInput = "has-error"
    var errorButton = "btn-danger"
    var primaryInput = ""
    var primaryButton = "btn-primary"

    vm.makeRequest = function(){
      if(vm.copies < 1 || vm.copies > 6){
        vm.statusInput = errorInput
        vm.statusButton = errorButton
          $timeout(function(){
            vm.statusInput = primaryInput
            vm.statusButton = primaryButton
          }, 500)
      }
      else{
        exporterService.putRequest($scope.id,vm.copies,"courses").then(
          function success(response){
            vm.statusInput = successInput
            vm.statusButton = successButton
            $timeout(function(){
              vm.toggle = false
              vm.statusInput = primaryInput
              vm.statusButton = primaryButton
            }, 500)
          },
          function error(error){
            console.log("Oh no...",error)
            vm.statusInput = errorInput
            vm.statusButton = errorButton
            vm.adderErrorPopoverIsOpen = true
            vm.adderErrorPopoverContent = error.data
            $timeout(function(){
              vm.toggle = false
              vm.statusInput = primaryInput
              vm.statusButton = primaryButton
              vm.adderErrorPopoverIsOpen = false
            }, 2000)
          }
        )
      }
    }

    vm.applyClassToInput= function(){
      return "input-group " + vm.statusInput
    }
    vm.applyClassToButton= function(){
      return "btn btn-sm " + vm.statusButton
    }
  };

  angular
    .module('sis')
    .controller('passedCoursesRequestCtrl', passedCoursesRequestCtrl);
})();