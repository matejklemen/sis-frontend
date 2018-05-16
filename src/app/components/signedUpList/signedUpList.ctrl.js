(function() {
  var signedUpListCtrl = function($scope, $routeParams, $location, authenticationService, examTermService) {
    var vm = this;

    if(!$routeParams.examTermId) {
      $location.path("/control");
    }

    vm.role = authenticationService.getRole();
    vm.identity = authenticationService.getIdentity();
    vm.loginId = authenticationService.getLoginId();

    examTermService.getExamTermById($routeParams.examTermId).then(
      function success(response) {
        vm.examTerm = response.data;
        console.log(vm.examTerm);
      },
      function error(error) {
        console.log("Mon dieu", error);
      }
    );

    examTermService.getSignedUpStudentsForExamTerm($routeParams.examTermId).then(
      function success(response) {
        vm.studentsList = response.data;
        console.log(vm.studentsList);
      },
      function error(error) {
        console.log("Mon dieu", error);
      }
    );
    
  };

  angular
    .module('sis')
    .controller('signedUpListCtrl', signedUpListCtrl);
})();