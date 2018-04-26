(function() {

  var exportButtons = function() {
    return {
      restrict: 'EC',
      scope: {
        data: '=expData',
        title: '@expTitle',
        columnNames: '<expColNames',
        columnValues: '<expColValues'
      },
      controller: "exportButtonsCtrl",
      controllerAs:'vm',
      templateUrl: "/shared/directives/exportButtons/exportButtons.template.html"
    };
  };

  angular
    .module('sis')
    .directive('exportButtons', exportButtons);
})();