(function() {
  var enrolCtrl = function($scope, $routeParams, $window, studentService, tokenService, codelistService, curriculumService,enrolmentService, authenticationService) {
    var vm = this;

    /* Get role */
    vm.role = authenticationService.getRole();

    /* Get and set data */
    tokenService.getTokenByStudentId($routeParams.studentId).then(
      function success(response) {
        console.log("Token:", response.data);
        vm.token = response.data;
        if(vm.token.used && vm.role.id==2) {
          $window.location.href = "/";
        }
        if(vm.role.id == 4){
          getLastEnrolment($routeParams.studentId);
        }
        getCurriculum(vm.token.studyProgram.id, vm.token.year);
        getStudentData(vm.token.student);
      },
      function error(error) {
        $window.location.href = "/";
      }
    );

    function getStudentData(id) {
      studentService.getByStudentId(id).then(
        function success(response) {
          console.log("Student:", response.data);
          vm.student = response.data;
          vm.surnameName = vm.student.surname + " " + vm.student.name;
          // fix for ng-model with input type date
          vm.student.dateOfBirth = new Date(vm.student.dateOfBirth);

          getFirstEnrolmentInProgram();
          setAndParseStudentData();
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

      codelistService.getCodelist("klasius").then(
        function success(response) {
          vm.cl.klasius = response.data;
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
    
    function getCurriculum(studyProgramId, year) {
      curriculumService.getCurriculum("20172018", studyProgramId, year).then(
        function success(response) {
          console.log("Curriculum:",response.data);

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
              if(vm.courses.mod[element.poc.id] === undefined) vm.courses.mod[element.poc.id] = [];
              vm.courses.mod[element.poc.id].push(element);
            }

          });

          updateCreditSum();
          updateSelectedModulesCount();
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

    function updateSelectedModulesCount() {
      vm.selectedModulesCount = 0;
      Object.keys(vm.courses.mod).forEach(function(key) {
        var hasAllChecked = true;
        for(var i=0; i<vm.courses.mod[key].length; i++) {
          if(!vm.courses.mod[key][i].selected) {
            hasAllChecked = false;
            break;
          }
        }

        if(hasAllChecked) vm.selectedModulesCount++;
      });
    }

    function getFirstEnrolmentInProgram() {
      enrolmentService.getFirstEnrolment(vm.student.id, vm.token.studyProgram.id).then(
        function success(response){
          console.log("first enrolment, ",response.data);
          vm.firstEnrolment = response.data.studyYear.name;
        },
        function error(error){
          vm.firstEnrolment = "2017/2018";
          //console.log("Oh no...",error);
        }
      );
    }

    function setAndParseStudentData(){
      vm.parsedStProgram = vm.token.studyProgram.evsCode + " " + (vm.token.studyProgram.name).split('(')[0];
      vm.checkEmso(vm.student.emso);
      vm.checkTaxNumber(vm.student.taxNumber);
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
            if(vm.selectedModulesCount < 2) {
              vm.courses.mod[cu.poc.id].forEach(function(element, index, array) {
                element.selected = cu.selected;
              });
            }
          }
        }
      }

      // update selected modules count
      updateSelectedModulesCount();
      updateCreditSum();
    };

    /* Finalize || Cencel enrolment [STUDENT] */

    vm.finalizeEnrolment = function() {
      if(vm.creditSum != 60) {
        // error
        vm.finalizeError = "Število kreditnih točk mora biti 60.";
        return;
      }

      // check if dateOfBirth is an object (if date is not set, it's of type 'undefined' and this test should fail)
      if(typeof vm.student.dateOfBirth !== 'object') {
        vm.finalizeError = "Datum rojstva ni vnešen ali je vnešen nepravilno.";
        return;
      }

      // stevilo izbranih strokovnih predmetov
      var countSiz = 0;
      vm.courses.siz.forEach(function(element, index, array) {
        if(element.selected) countSiz++;
      });

      if(vm.token.year == 2 && countSiz < 1) {
        vm.finalizeError = "Izbrati morate vsaj en strokovno izbirni predmet.";
        return;
      }

      if(vm.token.year == 3 && countSiz < 6) {
        vm.finalizeError = "Izbrati morate vsaj 6 strokovno izbirnih predmetov.";
        return;
      }

      if(vm.token.year == 3 && !vm.token.freeChoice && vm.selectedModulesCount != 2) {
        vm.finalizeError = "Izbrati morate 2 modula.";
        return;
      }

      //send to BE
      var objectToSend = {};

      objectToSend.student = Object.assign({}, vm.student); // Make a copy of object, don't reference
      objectToSend.enrolmentToken = vm.token;
      objectToSend.courses = [];

      objectToSend.student.dateOfBirth = convertDateToString(objectToSend.student.dateOfBirth);

      vm.curriculum.forEach(function(element, index, array) {
        if(element.selected || element.poc.type == "obv") {
          objectToSend.courses.push(element.idCourse.id);
        }
      });

      console.log(objectToSend);

      tokenService.postEnrolData(objectToSend).then(
        function success(response) {
          console.log("Vpis uspel:", response);
          $window.location.href = "/student/" + vm.student.registerNumber;
        },
        function error(error) {
          console.log(error);
          vm.finalizeError = error.data;
        }
      );
    };

    vm.cancelEnrolment = function() {
      if(confirm("Ste prepričani da želite preklicati vpis? Spremembe, ki ste jih naredili, se ne bodo shranile!"))
        $window.history.back();
    };

    /* Confirm || Reject enrolment [SKRBNIK]*/

    vm.confirmEnrolment = function() {
      // Subjects
      var countSiz = 0;
      vm.courses.siz.forEach(function(element, index, array) {
        if(element.selected) countSiz++;
      });

      // Object for backend
      var objectToSend = {};

      objectToSend.student = Object.assign({}, vm.student); // Make a copy of object, don't reference
      objectToSend.enrolmentToken = vm.token;
      objectToSend.courses = [];

      objectToSend.student.dateOfBirth = convertDateToString(objectToSend.student.dateOfBirth);

      vm.curriculum.forEach(function(element, index, array) {
        if(element.selected || element.poc.type == "obv") {
          objectToSend.courses.push(element.idCourse.id);
        }
      });

      console.log(objectToSend);

      // Send to backend
      enrolmentService.updateAndConfirmEnrolment(vm.student.id, objectToSend).then(
        function success(response) {
          console.log("Potrditev uspela:", response);
          $window.location.href = "/student/" + vm.student.registerNumber;
        },
        function error(error) {
          console.log(error);
          vm.finalizeError = error.data;
        }
      );
    };

    vm.cancel = function() {
      if(confirm("Ali ste prepričani da želite preklicati spremembe?")) {
        $window.history.back();
      }
    };

    vm.checkTaxNumber = function(taxno) {
      if(taxno == null || taxno.length != 8) {
        vm.isValidTaxNumber = false;
        return false;
      }

      vm.isValidTaxNumber = true;
      return true;
    };

    /* Helpers */
    vm.checkEmso = function(emso) {
      if(emso == null || emso.length != 13) {
        vm.isValidEmso = false;
        return false;
      }

      var numbs = emso.split('');
      var sum = 0;
      var counter = 0;
      var facts = [7,6,5,4,3,2,7,6,5,4,3,2];
      for(var i in numbs) {
        if(counter == 12) {
          if(11 - (sum % 11) == parseInt(numbs[i])) {
            vm.isValidEmso = true;
            return true;
          }
          vm.isValidEmso = false;
          return false;
        }
        sum += facts[counter] * parseInt(numbs[i]);
        counter+=1;
      }
    };

    vm.open2 = function() {
      vm.popup2.opened = true;
    };

    vm.popup2 = {
      opened: false
    };

    function convertDateToString(dateObject) {
      var year = String(dateObject.getFullYear());

      var month = String(dateObject.getMonth() + 1); // January is 0
      if(month.length < 2) {
        month = "0" + month;
      }
      
      var day = String(dateObject.getDate());
      if(day.length < 2) {
        day = "0" + day;
      }

      return year + "-" + month + "-" + day;
    }

    function getLastEnrolment(id){
      enrolmentService.getLastEnrolment(id).then(
        function success(response){
          if(response.data.confirmed){
            $window.location.href = "/";
          }
        },
        function error(error){
          console.log("Oh no...",error);
        }
      );
    }
  };

  angular
    .module('sis')
    .controller('enrolCtrl', enrolCtrl);
})();