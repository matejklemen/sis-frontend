(function() {

  var agreementList = function() {
    return {
      restrict: 'EC',
      scope: {
      },
      controller: 'agreementListCtrl',
      controllerAs:'vm',
      templateUrl: '/shared/directives/agreementList/agreementList.template.html'
    };
  };

  angular
    .module('sis')
    .directive('agreementList', agreementList);
})();