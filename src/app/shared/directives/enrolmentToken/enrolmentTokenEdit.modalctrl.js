(function() {
  var enrolmentTokenEditCtrl = function($scope, $uibModalInstance, tokenService, codelistService, resEnrolmentToken) {
    // resolved functions are added to controller parameters above (in this case resEnrolmentToken).
    // You can then access what is returned in resolved function by accessing this variable.

    var vm = this;
    vm.postStatus = false;

    vm.enrolmentToken = resEnrolmentToken;

    /* Valid values for selection */
    //vm.enrolmentType=["prvi vpis", "ponovni vpis", "absolvent"];
    //vm.enrolmentKind=["redni", "izredni"]; // enrolmentToken.kind
    vm.freeChoice=[
      {key:true,value:"da"},
      {key:false,value:"ne"}
    ];

    codelistService.getCodelist("studyprograms").then(
      function success(response) {
        vm.studyPrograms = response.data;
      },
      function error(error) {
        console.log("Oh no...", error);
      }
    );

    codelistService.getCodelist("studyyears").then(
      function success(response) {
        vm.studyYears = response.data;
      },
      function error(error) {
        console.log("Oh no...", error);
      }
    );

    codelistService.getCodelist("studytypes").then(
      function success(response) {
        vm.enrolmentType = response.data;
      },
      function error(error) {
        console.log("Oh no...", error);
      }
    );

    codelistService.getCodelist("studykinds").then(
      function success(response) {
        vm.enrolmentKind = response.data;
      },
      function error(error) {
        console.log("Oh no...", error);
      }
    );

    /* Save */
    vm.saveChanges = function(){
      tokenService.postToken(vm.enrolmentToken).then(
        function success(response){
          //console.log("Token was successfully posted");
          //vm.postStatus = "success";
          $uibModalInstance.close("success");
        },
        function error(error){
          //console.log("Error while posting token");
          vm.postStatus = error;
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
