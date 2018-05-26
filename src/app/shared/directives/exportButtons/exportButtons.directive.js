(function() {

  var exportButtons = function() {
    return {
      restrict: 'EC',
      scope: {
        data: '=expData',
        head: '<expHead',
        columnNames: '<expColNames',
        columnValues: '<expColValues',
        inLegend: '<expInLegend'
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
