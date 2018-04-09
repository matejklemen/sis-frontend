(function() {
  var enrolCtrl = function($scope, $routeParams, $window, studentService, tokenService) {
    var vm = this;

    /* Get and set data */
    tokenService.getTokenByStudentId($routeParams.studentId).then(
      function success(response) {
        console.log(response.data);
        vm.token = response.data;
        if(vm.token.used) {
          $window.location.href = "/";
        } else {
          getStudentData(vm.token.student);
        }
      },
      function error(error) {
        $window.location.href = "/";
      }
    );

    function getStudentData(id) {
      studentService.getByStudentId(id).then(
        function success(response) {
          console.log(response.data);
          vm.student = response.data;
          setAndParseStudentData();
        },
        function error(error) {
          
        }
      );
    }
    
    function setAndParseStudentData(){
      vm.parsedStProgram = vm.token.studyProgram.evsCode + " " + (vm.token.studyProgram.name).split('(')[0];
    }

    /* Helpers */
    function checkEMSO(emso){
      numbs = emso.split('');
      sum = 0;
      counter = 0;
      facts=[7,6,5,4,3,2,7,6,5,4,3,2];
      for(i in numbs){
        if(counter==12){
          if(11 - (sum%11) == parseInt(numbs[i])){
            return true;
          }
          return false;
        }
        sum += facts[counter] * parseInt(numbs[i]);
        counter+=1;
      }
    }
  };

  angular
    .module('sis')
    .controller('enrolCtrl', enrolCtrl);
})();