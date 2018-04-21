(function() {

  var studentList = function() {
    return {
      restrict: 'EC',
      scope: {
      },
      controller: "studentListCtrl",
      controllerAs:'vm',
      templateUrl: "/shared/directives/studentList/studentList.template.html"
    };
  };

  angular
    .module('sis')
    .directive('studentList', studentList);
})();