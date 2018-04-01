
(function() {
  var enrTokenCtrl = function($scope,tokenService) {
    var vm = this;
    
    getEnrolmentToken($scope.id);

    vm.studyProgram=["Z2","XU","X6","X5","VV","VU","VT","P7","MM","LE","L3","L2","L1","KP00","Izmenjave","HB","7E","71","7002801","03","02"];
    vm.studyYear=[1,2,3];
    vm.enrolmentType=["prvi vpis", "ponovni vpis", "absolvent"];
    vm.studyType=["redni", "izredni"];

    vm.NewEnrolmentToken = function(){
      tokenService.putToken($scope.id).then(
        function success(response){
          vm.enrolmentToken = response.data;
          console.log("dobil rezultat: ", vm.content);
        },
        function error(error){
          console.log("Error in enrTokenCtrl. Message: ", error);
          vm.enrolmentToken = null;
        }
      );
    }

    vm.DeleteEnrolmentToken = function(id){
      if (confirm('Ste prepričani da želite izbrisati žeton za vpis?')) {
        tokenService.deleteToken(id).then(
          function success(response){
            console.log("Token was successfully deleted");
            vm.enrolmentToken = null;
          },
          function error(error){
            console.log("Error while deleting token");
          }
        );
      }
    }

    vm.setTokenData = function(token){
      vm.selectedStudyProgram = token.studyProgram.id;
      vm.selectedStudyYear = token.year;
      vm.selectedEnrolmentType = token.type;
      vm.selectedStudyType = token.kind;
    }

    vm.saveChanges = function(token){
      token.studyProgram.id = vm.selectedStudyProgram;
      token.year = vm.selectedStudyYear;
      token.type = vm.selectedEnrolmentType;
      token.kind = vm.selectedStudyType;

      tokenService.postToken(token).then(
        function success(response){
          console.log("Token was successfully posted");
          vm.postStatus = "success";
        },
        function error(error){
          console.log("Error while posting token");
          vm.postStatus = "error";
        }
      );
    }

    function getEnrolmentToken(studentId){
      tokenService.getTokenByStudentId(studentId).then(
        function success(response){
          vm.enrolmentToken = response.data;
        },
        function error(error){
          vm.enrolmentToken = null;
        }
      );
    }


  };

  enrTokenCtrl.$Inject = ["$scope","tokenService"]

  angular
    .module('sis')
    .controller('enrTokenCtrl', enrTokenCtrl);
})();