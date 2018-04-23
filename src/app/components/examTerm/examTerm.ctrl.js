(function() {
  var examTermCtrl = function($scope, $routeParams, $window, professorsService, authenticationService, courseOrganizationService) {
    var vm = this;

    /* Get role */
    vm.role = authenticationService.getRole();

    /* profesor/ica */
    if(vm.role.id == 3) {
    	profIdentity = authenticationService.getIdentity();

        // get professor's full name
    	profFullName = professorsService.getProfessorData(profIdentity).then(
    		function success(response) {
    			profFullName = response.data.firstName + " " + response.data.lastName1 + " " + (response.data.lastName2 != null ? response.data.lastName2: "");

                vm.professor = response.data;
                vm.professor.fullName = profFullName;
    		},
    		function error(error) {
    			console.log('Error obtaining professor\'s data! Are you sure you are logged into a professor\'s account?');
                $window.location.href = "/";
    		});

        // get courses organized or co-organized by current professor
        courseOrganizations = courseOrganizationService.getCourseOrganizationsForProfessor(profIdentity).then(
            function success(response) {
                console.log(response.data);
                vm.coursesForProfessor = response.data;

                if(response.data.length > 0)
                    vm.selectedCourseOrganization = response.data[0];
            },
            function error(error) {
                console.log('Error obtaining course organization data for selected professor!');
            });

        // set default exam type
        vm.typeOfExam = "pisni";

        // set default exam duration
        vm.durationOfExam = 60;
    }
    /* referent/ka */
    else if(vm.role.id == 4) {

    }

    isSaturdaySunday = function(dateString) {
        day = dateString.split(" ")[0];

        if(day == "Sat" || day == "Sun")
            console.log("Date is on a saturday or sunday!");
    }

    // YYYY-MM-DD HH:MM:SS
    formatDatetime = function(date, time) {
        YYYY = date.getFullYear();
        MM = date.getMonth();
        MM += 1;
        if(MM < 10)
            MM = "0" + MM;

        DD = date.getDate();

        hrs = time.getHours();
        mins = time.getMinutes();

        return (YYYY + "-" + MM + "-" + DD + "-" + hrs + "-" + mins + "-00");
    }

    vm.open2 = function() {
      vm.popup2.opened = true;
    };

    vm.popup2 = {
      opened: false
    };

    vm.finalizeInsertingExamTerm = function() {
        vm.finalizeError = "";

        if(vm.dateOfExam === undefined) {
            vm.finalizeError = "Datum izpita je neizpolnjen!";
            return;
        }
        else {
            console.log("Date: " + vm.dateOfExam.toDateString())
            isSaturdaySunday(vm.dateOfExam.toDateString());
        }

        if(vm.timeOfExam === undefined) {
            vm.finalizeError = "Čas izpita je neizpolnjen!";
            return;
        }
        else
            console.log("Time: " + vm.timeOfExam.toTimeString());

        if(vm.durationOfExam === undefined) {
            vm.finalizeError = "Trajanje izpita ni določeno!";
            return;
        }
        else if(vm.durationOfExam < 0) {
            vm.finalizeError = "Trajanje izpita ne sme biti negativno!";
            return;
        }

        // TODO check if professor belongs to a course organization


        // send payload
        var objectToSend = {};
        objectToSend.course = Object.assign({}, vm.selectedCourseOrganization);
        objectToSend.duration = vm.durationOfExam; 
        objectToSend.date = formatDatetime(vm.dateOfExam, vm.timeOfExam);

        console.log("Selected professor: " + vm.professor.fullName);
        console.log(vm.selectedCourseOrganization);
    }

  };

  angular
    .module('sis')
    .controller('examTermCtrl', examTermCtrl);
})();