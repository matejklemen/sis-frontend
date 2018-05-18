(function() {
  var examTermsListCtrl = function($scope, $routeParams, $location, $filter, $uibModal, examTermService, codelistService, authenticationService) {
    var vm = this;

    /* Get role */
    vm.role = authenticationService.getRole();
    vm.loginId = authenticationService.getLoginId();

    vm.currentPage = 1;
    vm.limit = 20;

    // will be 'undefined' in case of role != professor, so all data will be shown
    var profIdentity = authenticationService.getIdentity();

    vm.error = {};

    codelistService.getCodelist("studyyears").then(
      function success(response) {
        vm.selectableYears = response.data;
        vm.selectableYears.push({"id": null, "name": "Vsa šolska leta"});
        vm.filterYear = vm.selectableYears[vm.selectableYears.length - 1];
      },
      function error(error) {
        console.log("Oh no...", error);
      }
    );

    vm.getExamTermList = function() {
      var selectedYr = vm.filterYear === undefined ? null : vm.filterYear.id;

      examTermService.getAllExamTerms((vm.currentPage - 1) * vm.limit, vm.limit, profIdentity, selectedYr).then(
        function success(response) {
          vm.totalCount = response.headers('X-total-count');
          vm.searchResult = response.data;

          vm.searchResult.forEach(function(elem, index, array) {
            // if the exam term hasn't happened yet, if it's valid we can still edit it
            elem.isValid = new Date(elem.datetime) - Date.now() >= 0;
            
            elem.formattedDatetime = $filter('formatDate')(elem.datetime);
            // reassigning some stuff to depth 0 variables so that export to PDF/csv works normally
            elem.courseName = elem.courseOrganization.course.name;
            elem.organizerFullName = elem.organizer.firstName + ' ' + elem.organizer.lastName1 +
              (elem.organizer.lastName2 !== null? ' ' + elem.organizer.lastName2: '');

          });
        },
        function error(error) {
          console.log(error);
        });
    };

    vm.getExamTermList();

    vm.deleteExamTerm = function(examTerm, index) {
      //showDeleteExamTermModal
      var modalInstance = $uibModal.open({
        templateUrl: 'shared/directives/examTermsList/deleteExamTermModal.modalview.html',
        controller: 'deleteExamTermModalCtrl',
        controllerAs: 'vm',
        resolve: {
          resExamTerm: function() {
            return examTerm;
          },
          resUserLogin: function() {
            return vm.loginId;
          },
          resUserRole: function() {
            return vm.role;
          }
        }
      });

      // get result from modal after it's closed here
      modalInstance.result.then(
        function(result) {
          if(result == "deleted") {
            // remove exam term from the list
            vm.searchResult.splice(index, 1);
          }
        },
        function(closeInfo) {}
      );
    };

    vm.changedPage = function() {
      vm.getExamTermList();
    };

    vm.redirectToExamForm = function() {
      $location.path("/examterm");
    };

  };

  angular
  .module('sis')
  .controller('examTermsListCtrl', examTermsListCtrl);
})();
