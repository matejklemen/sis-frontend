(function() {
  var examTermCtrl = function($scope, $routeParams, $location, professorsService, authenticationService, courseOrganizationService, examTermService) {
    var vm = this;

    /* Get role */
    vm.role = authenticationService.getRole();

    // load data by examTermId
    if($routeParams.examTermId !== undefined) {
      examTermService.getExamTermById($routeParams.examTermId).then(
        function success(response) {
          console.log(response.data);
          
          vm.examTerm = response.data;
          
          // assign temporary date and time from datetime
          vm.examTerm.date = new Date(vm.examTerm.datetime);
          vm.examTerm.time = new Date(vm.examTerm.datetime);

          getAvailableCourses();
        },
        function error(error) {
          console.log('Error: TODO redirect');
          //$location.path("/control");
        });
    }

    function getAvailableCourses() {
      if(vm.role.id == 3) { /* profesor/ica */
        var profIdentity = authenticationService.getIdentity();

        // get professor's full name
        var profFullName = professorsService.getProfessorData(profIdentity).then(
          function success(response) {
              vm.selectedProfessor = response.data;
          },
          function error(error) {
              vm.finalizeError = 'račun ni povezan s podatki izvajalca';
              return;
          });

        // get courses organized or co-organized by current professor
        var courseOrganizations = courseOrganizationService.getCourseOrganizationsForProfessor(profIdentity).then(
          function success(response) {
            console.log(response.data);
            vm.availableCourses = response.data;

            if(response.data.length > 0)
              vm.selectedCourseOrganization = response.data[0];
          },
          function error(error) {
            vm.finalizeError = 'za izbranega izvajalca ni v sistemu naveden noben predmet, ki bi se izvajal';
            return;
          });
      } else if(vm.role.id == 4) { /* referent/ka */
        // TODO: only get course organizations for current study year 
        courseOrganizationService.getAllCourseOrganizations().then(
          function success(response) {
            vm.availableCourses = response.data;
            console.log(response.data);
            // select default option from the list
            vm.availableCourses.some(function(elem, index) {
              if(elem.id == vm.examTerm.course.id) {
                vm.examTerm.course = elem;
                return;
              }
            });
        },
        function error(error) {
          vm.finalizeError = 'v sistemu ni vpisan noben predmet';
          return;
        });            
      }
      


    }

    var isSaturdaySunday = function(dateString) {
        var day = new Date(dateString).getDay();

        return (day == 0 || day == 6);
    };

    var isDateHoliday = function(dateString) {
        var date = new Date(dateString);

        var month = date.getMonth() + 1;
        var day = date.getDate();

        var holidays = {
                1: [1, 2],
                2: [8],
                4: [27],
                5: [1, 2],
                8: [15],
                6: [25],
                10: [31],
                11: [1],
                12: [25, 26]
        };

        var hday = holidays[month];
        if(hday === undefined)
            return false;

        for(var i = 0; i < hday.length; i++)
            if(hday[i] == day)
                return true;

        return false;
    };

    vm.updateSelectableOrganizers = function() {
        var selectableProfessors = [];

        selectableProfessors.push(vm.availableCourses.organizer1);
        if(vm.availableCourses.organizer2 !== null)
            selectableProfessors.push(vm.availableCourses.organizer2);
        if(vm.availableCourses.organizer3 !== null)
            selectableProfessors.push(vm.availableCourses.organizer3);

        vm.professor = selectableProfessors;
        vm.selectedProfessor = selectableProfessors[0];
    };

    // YYYY-MM-DD HH:MM:SS
    var formatDatetime = function(date, time) {
        var YYYY = date.getFullYear();
        var MM = date.getMonth();
        MM += 1;
        if(MM < 10)
            MM = "0" + MM;

        var DD = date.getDate();

        var hrs = time.getHours();
        var mins = time.getMinutes();

        return new Date(YYYY + "-" + MM + "-" + DD + " " + hrs + ":" + mins + ":00");
    };

    vm.open2 = function() {
      vm.popup2.opened = true;
    };

    vm.popup2 = {
      opened: false
    };

    vm.finalizeInsertingExamTerm = function() {
        vm.finalizeError = "";
        
        if(vm.examTerm.course === undefined) {
            vm.finalizeError = "izbran ni bil noben predmet";
            return;
        }

        // probably add field to CourseExamTerm that contains Professor entity to save orgnaizer of the exam
        /*if(vm.examTerm.organizer === undefined) {
            vm.finalizeError = "izbran ni bil noben profesor";
            return;
        }*/

        if(vm.examTerm.datetime === undefined) {
            vm.finalizeError = "datum izpita je neizpolnjen!";
            return;
        }
        else if(isSaturdaySunday(vm.examTerm.date.toDateString())) {
            vm.finalizeError = "dan izpita je sobota ali nedelja!";
            return;
        }
        else if(isDateHoliday(vm.examTerm.date.toDateString())) {
            vm.finalizeError = "dan izpita je dela prost dan!";
            return;
        }

        if(vm.examTerm.time === undefined) {
            vm.finalizeError = "čas izpita je neizpolnjen!";
            return;
        }

        if(vm.examTerm.duration === undefined) {
            vm.finalizeError = "trajanje izpita ni določeno!";
            return;
        }
        else if(vm.examTerm.duration < 0) {
            vm.finalizeError = "trajanje izpita ne sme biti negativno!";
            return;
        }

        // We are making a copy of the object (model) to send so we can put date and time into a single field,
        // without affecting the model displayed.

        var objectToSend = Object.assign({}, vm.examTerm);
        objectToSend.datetime = formatDatetime(vm.examTerm.date, vm.examTerm.time);
        // these two were joined into datetime, so we can remove them before sending
        delete objectToSend.date;
        delete objectToSend.time;

        console.log(objectToSend);

        examTermService.sendExamTerm(objectToSend).then(
          function success(response) {
            $location.path("/control");
          },
          function error(error) {
            vm.finalizeError = error.data;
          });
    };

  };

  angular
    .module('sis')
    .controller('examTermCtrl', examTermCtrl);
})();