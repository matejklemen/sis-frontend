(function() {
  var maintenanceProfessorsCtrl = function($scope, $routeParams, $location, $filter, $uibModal, examTermService, codelistService, authenticationService) {
    var vm = this;

    /* Get role */
    vm.role = authenticationService.getRole();
    vm.loginId = authenticationService.getLoginId();

    vm.currentPage = 1;
    vm.limit = 20;

    // will be 'undefined' in case of role != professor, so all data will be shown
    var profIdentity = authenticationService.getIdentity();

  };

  angular
  .module('sis')
  .controller('maintenanceProfessorsCtrl', maintenanceProfessorsCtrl);
})();
