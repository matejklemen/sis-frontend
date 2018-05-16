(function() {

  var studentIndexButton = function() {
    return {
      restrict: 'EC',
      scope: {
        id: '=',
      },
      controller: "studentIndexCtrl",
      controllerAs:'vm',
      templateUrl: "/shared/directives/studentIndex/studentIndex.template.html"
    };
  };

  angular
    .module('sis')
    .directive('studentIndexButton', studentIndexButton);
})();