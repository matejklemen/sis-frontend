(function() {
  var agreementListCtrl = function($scope, $routeParams, $location, $filter, $uibModal, agreementService, authenticationService) {
    var vm = this;

    /* Get role */
    vm.role = authenticationService.getRole();
    vm.loginId = authenticationService.getLoginId();

    vm.currentPage = 1;
    vm.limit = 20;

    vm.error = {};

    vm.getAgreementList = function() {
      var selectedYr = vm.filterYearOfIssue === undefined ? null: vm.filterYearOfIssue;

      agreementService.getAgreements((vm.currentPage - 1) * vm.limit, vm.limit, selectedYr).then(
        function success(response) {
          vm.totalCount = response.headers('X-total-count');
          vm.searchResult = response.data;
        },
        function error(error) {
          console.log('Error loading agreements...');
        });
    };

    vm.getAgreementList();

    vm.deleteAgreement = function(agreement, index) {
      //showDeleteExamTermModal
      var modalInstance = $uibModal.open({
        templateUrl: 'shared/directives/agreementList/deleteAgreementModal.modalview.html',
        controller: 'deleteAgreementModalCtrl',
        controllerAs: 'vm',
        resolve: {
          resAgreement: function() {
            return agreement;
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

    vm.redirectToAgreementForm = function() {
      $location.path("/agreement");
    };

  };

  angular
  .module('sis')
  .controller('agreementListCtrl', agreementListCtrl);
})();
