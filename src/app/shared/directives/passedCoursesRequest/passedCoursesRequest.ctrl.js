(function() {
  var passedCoursesRequestCtrl = function($scope, exporterService, $timeout) {
    var vm = this;

    vm.toggle = false;
    vm.copies = 1
    vm.successPut = false

    vm.makeRequest = function(){
      exporterService.putRequest($scope.id,vm.copies,"courses").then(
        function success(response){
          vm.successPut = true;
          $timeout(function(){
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
    .controller('passedCoursesRequestCtrl', passedCoursesRequestCtrl);
})();