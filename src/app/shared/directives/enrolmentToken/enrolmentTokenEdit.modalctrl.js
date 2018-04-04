(function() {
  var enrolmentTokenEditCtrl = function($scope, $uibModalInstance, tokenService, resEnrolmentToken) {
    // resolved functions are added to controller parameters above (in this case resEnrolmentToken).
    // You can then access what is returned in resolved function by accessing this variable.

    var vm = this;
    vm.postStatus = false;

    vm.enrolmentToken = resEnrolmentToken;
    console.log(resEnrolmentToken);

    vm.studyProgram=["Z2","XU","X6","X5","VV","VU","VT","P7","MM","LE","L3","L2","L1","KP00","Izmenjave","HB","7E","71","7002801","03","02"];
    vm.studyYear=[1,2,3];
    vm.enrolmentType=["prvi vpis", "ponovni vpis", "absolvent"];
    vm.studyType=["redni", "izredni"]; // enrolmentToken.kind

    vm.saveChanges = function(){

      tokenService.postToken(vm.enrolmentToken).then(
        function success(response){
          console.log("Token was successfully posted");
          vm.postStatus = "success";
        },
        function error(error){
          console.log("Error while posting token");
          vm.postStatus = "error";
        }
      );
    };

    vm.close = function() {
      // parameter of dismiss function is an object we pass back to view after modal is closed
      $uibModalInstance.dismiss({"cancel": "cool"});
    };
  };

  angular
    .module('sis')
    .controller('enrolmentTokenEditCtrl', enrolmentTokenEditCtrl);
})();
