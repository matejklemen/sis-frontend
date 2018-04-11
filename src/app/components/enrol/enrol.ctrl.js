(function() {
  var enrolCtrl = function($scope, $routeParams, $window, studentService, tokenService, codelistService, curriculumService) {
    var vm = this;

    /* Get and set data */
    tokenService.getTokenByStudentId($routeParams.studentId).then(
      function success(response) {
        console.log(response.data);
        vm.token = response.data;
        if(vm.token.used) {
          $window.location.href = "/";
        } else {
          getCurriculum(vm.token);
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

          // fix for ng-model with input type date
          vm.student.dateOfBirth = new Date(vm.student.dateOfBirth);
        },
        function error(error) {
          
        }
      );
    }

    loadCodelists();

    function loadCodelists() {
      vm.cl = {};

      codelistService.getCodelist("postaddresses").then(
        function success(response) {
          vm.cl.postaddresses = response.data;
        },
        function error(error) {
          console.log("Oh no...", error);
        }
      );

      codelistService.getCodelist("countries").then(
        function success(response) {
          vm.cl.countries = response.data;
        },
        function error(error) {
          console.log("Oh no...", error);
        }
      );

      codelistService.getCodelist("municipalities").then(
        function success(response) {
          vm.cl.municipalities = response.data;
        },
        function error(error) {
          console.log("Oh no...", error);
        }
      );

      codelistService.getCodelist("studyprograms").then(
        function success(response) {
          vm.cl.studyprograms = response.data;
        },
        function error(error) {
          console.log("Oh no...", error);
        }
      );

      codelistService.getCodelist("studydegrees").then(
        function success(response) {
          vm.cl.studydegrees = response.data;
        },
        function error(error) {
          console.log("Oh no...", error);
        }
      );

      codelistService.getCodelist("studytypes").then(
        function success(response) {
          vm.cl.studytypes = response.data;
        },
        function error(error) {
          console.log("Oh no...", error);
        }
      );

      codelistService.getCodelist("studykinds").then(
        function success(response) {
          vm.cl.studykinds = response.data;
        },
        function error(error) {
          console.log("Oh no...", error);
        }
      );

      codelistService.getCodelist("studyforms").then(
        function success(response) {
          vm.cl.studyforms = response.data;
        },
        function error(error) {
          console.log("Oh no...", error);
        }
      );

    }
    
    function getCurriculum(token) {
      curriculumService.getCurriculum("20172018", token.studyProgram.id, token.year).then(
        function success(response) {
          console.log("got curriculum: ",response.data);

          vm.courses = {
            obv: [],
            siz: [], // strokovni izbirni
            piz: [], // prosto izbirni
            mod: {}
          };
          
          vm.curriculum = response.data;
          vm.curriculum.forEach(function(element, index, array) {
            if(element.poc.type == "obv") {
              vm.courses.obv.push(element);
            } else if(element.poc.type == "siz") {
              vm.courses.siz.push(element);
            } else if(element.poc.type == "piz") {
              vm.courses.piz.push(element);
            } else {
              // modulske predmete dodaj tudi med strokovne
              vm.courses.siz.push(element);

              // hrani tabelice kjer so zdruzeni modulski predmeti
              if(vm.courses.mod[element.poc.idPOC] === undefined) vm.courses.mod[element.poc.idPOC] = [];
              vm.courses.mod[element.poc.idPOC].push(element);
            }

          });

          updateCreditSum();
        },
        function error(error) {
          console.log("Oh no...",error);
        }
      );
    }

    function updateCreditSum() {
      vm.creditSum = 0;
      vm.curriculum.forEach(function(element, index, array) {
        if(element.selected || element.poc.type == "obv") {
          vm.creditSum += element.idCourse.creditPoints;
        }
      });
    } 

    vm.courseCheckboxClick = function(cu) {
      if(vm.token.year == 2) {
        // izbrati mora vsaj en strokovni izbirni predmet (lahko več)
      }

      if(vm.token.year == 3) {
        if(vm.token.freeChoice) {
          // izbira lahko med katerikolimi predmeti brez omejitev
        } else {
          // izbira je omejena na module
          if(cu.poc.type == "mod") {
            // v istem modulu oznaci enako vse predmete
            vm.courses.mod[cu.poc.idPOC].forEach(function(element, index, array) {
              element.selected = cu.selected;
            });
          }
        }
      }


      updateCreditSum();
    };

    /* Helpers */
    function checkEMSO(emso) {
      var numbs = emso.split('');
      var sum = 0;
      var counter = 0;
      var facts = [7,6,5,4,3,2,7,6,5,4,3,2];
      for(var i in numbs) {
        if(counter == 12) {
          if(11 - (sum % 11) == parseInt(numbs[i])) {
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