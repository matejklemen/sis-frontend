(function() {
  var agreementCtrl = function($scope, $routeParams, $location, studentService, authenticationService, agreementService) {
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


    if(vm.updateMode)
      selectSavedOptions();

    function selectSavedOptions() {
      agreementService.getAgreementById($routeParams.agreementId).then(
        function success(response) {
          vm.agreement = response.data;
          vm.agreement.issueDate = new Date(vm.agreement.issueDate); 

          if(vm.agreement.validUntil != null)
            vm.agreement.validUntil = new Date(vm.agreement.validUntil);

          studentService.getEnrolledForCurrentYear().then(
            function success(response) {
              vm.selectableStudents = response.data;
              vm.selectableStudents.some(function(elem, index) {
                  if(elem.id == vm.agreement.student.id) {
                    vm.agreement.student = elem;
                    return;
                  }
              });
            },
            function error(error) {
              console.log("Error getting enrolled students for current year (inside update)...");
              console.log(error);
            })


        
        },
        function error(error) {
          console.log("Error when trying to get selected options from existing agreement...");
          console.log(error);
          vm.cancelEdit();
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
        vm.agreement.student = {"id": vm.agreement.student.id};

        if(vm.agreement.issueDate === undefined) {
            vm.finalizeError = "datum izdaje sklepa je neizpolnjen!";
            return;
        }

        vm.agreement.issueDate = new Date(vm.agreement.issueDate);

        if(vm.agreement.contentSlovene === undefined) {
            vm.finalizeError = "vsebina sklepa je prazna!";
            return;
        }

        if(vm.agreement.validUntil != undefined && vm.agreement.validUntil != null)
          vm.agreement.validUntil = new Date(vm.agreement.validUntil);

        // We are making a copy of the object (model) to send so we can put date and time into a single field,
        // without affecting the model displayed.

        var objectToSend = Object.assign({}, vm.agreement);

        console.log(objectToSend);
        if(vm.updateMode) {
          console.log("Update mode!");
          console.log(objectToSend)
          agreementService.updateAgreement(objectToSend).then(
            function success(response) {
              $location.path("/control");
            },
            function error(error) {
              console.log("Error when updating...");
              if(error.data.status == 400)
                vm.finalizeError += error.data.messages[0];
              else
                vm.finalizeError += "neznana napaka";

              console.log(error);
            });
        }
        else {
          console.log("Insert mode!");
          agreementService.insertAgreement(objectToSend).then(
            function(success) {
              $location.path("/control");
            },
            function error(error) {
              console.log("Error when inserting...");
              if(error.data.status == 400)
                vm.finalizeError += error.data.messages[0];
              else
                vm.finalizeError += "neznana napaka";

              console.log(error);
            });
        }
    };

  };

  angular
    .module('sis')
    .controller('agreementCtrl', agreementCtrl);
})();