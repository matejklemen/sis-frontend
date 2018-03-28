(function() {

  var studentList = function() {
    return {
      restrict: 'EC',
      scope: {
      },
      controller: "studentlistCtrl",
      controllerAs:'vm',
      templateUrl: "/shared/directives/studentlist/studentlist.template.html"
    };
  };

  angular
    .module('sis')
    .directive('studentList', studentList);
})();