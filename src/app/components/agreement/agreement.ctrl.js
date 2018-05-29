(function() {
  var agreementCtrl = function($scope, $routeParams, $location, studentService, authenticationService, courseOrganizationService, examTermService) {
    var vm = this;

    /* Get role */
    vm.role = authenticationService.getRole();
    vm.updateMode = ($routeParams.agreementId !== undefined);
    vm.agreement = {};

    /* != referent/ka */
    if(vm.role.id != 4)
      vm.cancelEdit();

    studentService.getEnrolledForCurrentYear().then(
      function success(response) {
        vm.selectableStudents = response.data;
      },
      function error(error) {
        console.log("I guess nobody is enrolled in current study year...");
      });


    function selectSavedOptions() {
      examTermService.getExamTermById($routeParams.examTermId).then(
        function success(response) {
          vm.examTerm = response.data;

          // only allow professors to see exams for their own courses
          if(vm.role.id == 3 && vm.examTerm.organizer.id !== profIdentity)
            vm.cancelEnrolment();

          // assign temporary date and time from datetime
          vm.examTerm.date = new Date(vm.examTerm.datetime);
          vm.examTerm.time = new Date(vm.examTerm.datetime);

          var selectableProfessors = [vm.examTerm.courseOrganization.organizer1];
          if(vm.examTerm.courseOrganization.organizer2 !== null)
            selectableProfessors.push(vm.examTerm.courseOrganization.organizer2);
          if(vm.examTerm.courseOrganization.organizer3 !== null)
            selectableProfessors.push(vm.examTerm.courseOrganization.organizer3);

          vm.professor = selectableProfessors;
          vm.professor.some(function(elem, index) {
              if(elem.id == vm.examTerm.organizer.id) {
                vm.examTerm.organizer = elem;
                return;
              }
          });

          vm.availableCourses.some(function(elem, index) {
            if(elem.id == vm.examTerm.courseOrganization.id) {
              vm.examTerm.courseOrganization = elem;
              return;
            }
          });
        },
        function error(error) {
          console.log(error);
          vm.cancelEnrolment();
        });      
    }


    vm.cancelEdit = function() {
      $location.path("/control");
    };

    vm.open1 = function() {
      vm.popup1.opened = true;
    };
    vm.open2 = function() {
      vm.popup2.opened = true;
    };

    vm.popup1 = {
      opened: false
    };
    vm.popup2 = {
      opened: false
    };

    vm.finalizeInsertingAgreement = function() {
        vm.finalizeError = "";

        if(vm.agreement.issuer === undefined) {
            vm.finalizeError = "izdajatelj sklepa ni naveden!";
            return;
        }

        if(vm.agreement.student === undefined) {
            vm.finalizeError = "izbran ni bil noben študent!";
            return;
        }

        // send only the ID to prevent possible hardly traceable errors
        vm.agreement.student = vm.agreement.student.id;

        if(vm.agreement.issueDate === undefined) {
            vm.finalizeError = "datum izdaje sklepa je neizpolnjen!";
            return;
        }

        if(vm.agreement.contentSlovene === undefined) {
            vm.finalizeError = "vsebina sklepa je prazna!";
            return;
        }

        // We are making a copy of the object (model) to send so we can put date and time into a single field,
        // without affecting the model displayed.

        var objectToSend = Object.assign({}, vm.agreement);

        console.log(objectToSend);
        if(vm.updateMode) {
          console.log("Update mode!");
        }
        else {
          console.log("Insert mode!");
        }
    };

  };

  angular
    .module('sis')
    .controller('agreementCtrl', agreementCtrl);
})();