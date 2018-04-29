(function() {
  var examTermsListCtrl = function($scope, $routeParams, examTermService, codelistService, authenticationService) {
    var vm = this;

    /* Get role */
    vm.role = authenticationService.getRole();

    vm.currentPage = 1;
    var limit = 20;

    // will be 'undefined' in case of role != professor, so all data will be shown
    var profIdentity = authenticationService.getIdentity();

    vm.error = {};

    var getExamTermList = function() {
      examTermService.getAllExamTerms((vm.currentPage - 1) * limit, limit, profIdentity).then(
        function success(response) {
          vm.totalCount = response.headers('X-total-count');
          vm.searchResult = response.data;

          for(var i = 0; i < vm.searchResult.length; i++) {
            var tmp = new Date(vm.searchResult[i].datetime);
            var dd = tmp.getDate();
            var mm = tmp.getMonth() + 1;
            var yyyy = tmp.getFullYear();
            var hh = tmp.getHours();
            var min = tmp.getMinutes();
            if(min < 10)
              min = '0' + min;

            vm.searchResult[i].formattedDatetime = dd + '. ' + mm + '. ' + yyyy + ' ob ' + hh + ':' + min;
            // reassigning some stuff to depth 0 variables so that export to PDF/csv works normally
            vm.searchResult[i].courseName = vm.searchResult[i].course.course.name;
            vm.searchResult[i].organizerFullName = vm.searchResult[i].organizer.firstName + ' ' + vm.searchResult[i].organizer.lastName1 + 
              (vm.searchResult[i].organizer.lastName2 !== null? ' ' + vm.searchResult[i].organizer.lastName2: '');
          }
        },
        function error(error) {
          console.log(error);
        });
    }

    getExamTermList();

    vm.deleteCourse = function(id) {
      if(!confirm('Ste prepričani, da želite izbrisati žeton za vpis?'))
        return;

      examTermService.deleteExamTerm(id).then(
        function success(response) {
          getExamTermList();
        },
        function error(error) {
          console.log(error);
        });
    };

    vm.changedPage = function() {
      getExamTermList();
    };

  };

  angular
  .module('sis')
  .controller('examTermsListCtrl', examTermsListCtrl);
})();
