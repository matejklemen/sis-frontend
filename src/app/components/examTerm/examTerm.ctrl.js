(function() {
  var examTermCtrl = function($scope, $routeParams, $window, professorsService, authenticationService, courseOrganizationService, examTermService) {
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
        day = new Date(dateString).getDay();

        return (day == 0 || day == 6);
    }

    isDateHoliday = function(dateString) {
        date = new Date(dateString);

        month = date.getMonth() + 1;
        day = date.getDate();

        holidays = {
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

        hday = holidays[month];
        if(hday === undefined)
            return false;

        for(var i = 0; i < hday.length; i++)
            if(hday[i] == day)
                return true;

        return false;
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

        return new Date(YYYY + "-" + MM + "-" + DD + " " + hrs + ":" + mins + ":00");
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
        else if(isSaturdaySunday(vm.dateOfExam.toDateString())) {
            vm.finalizeError = "Dan izpita je sobota ali nedelja!";
            return;
        }
        else if(isDateHoliday(vm.dateOfExam.toDateString())) {
            vm.finalizeError = "Dan izpita je dela prost dan!";
            return;
        }

        if(vm.timeOfExam === undefined) {
            vm.finalizeError = "Čas izpita je neizpolnjen!";
            return;
        }

        if(vm.durationOfExam === undefined) {
            vm.finalizeError = "Trajanje izpita ni določeno!";
            return;
        }
        else if(vm.durationOfExam < 0) {
            vm.finalizeError = "Trajanje izpita ne sme biti negativno!";
            return;
        }

        // send payload
        var objectToSend = {};
        objectToSend.course = Object.assign({}, vm.selectedCourseOrganization);
        objectToSend.duration = vm.durationOfExam; 
        objectToSend.date = formatDatetime(vm.dateOfExam, vm.timeOfExam);
        

        examTermService.sendExamTerm(objectToSend).then(
            function success(response) {
                $window.location.href = "/control";
            },
            function error(error) {
                vm.finalizeError = error.data;
            });
    }

  };

  angular
    .module('sis')
    .controller('examTermCtrl', examTermCtrl);
})();