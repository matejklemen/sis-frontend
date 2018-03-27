(function() {

  var studentImport = function() {
    return {
      restrict: 'EC',
      scope: {
      },
      controller: "importCtrl",
      controllerAs:'vm',
      templateUrl: "/shared/directives/import/import.template.html"
    };
  };

  angular
    .module('sis')
    .directive('studentImport', studentImport);
})();