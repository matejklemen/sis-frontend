(function() {

  var examTermsList = function() {
    return {
      restrict: 'EC',
      scope: {
      },
      controller: "examTermsListCtrl",
      controllerAs:'vm',
      templateUrl: "/shared/directives/examTermsList/examTermsList.template.html"
    };
  };

  angular
    .module('sis')
    .directive('examTermsList', examTermsList);
})();