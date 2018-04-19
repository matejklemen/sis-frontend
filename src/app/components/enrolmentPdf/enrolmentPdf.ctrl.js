(function() {
  var enrolmentPdfCtrl = function($scope, $http, $timeout) {

    $scope.pdf = {
        data: 'components/enrolmentPdf/example.pdf',
    };
      
    
  };

  angular
    .module('sis')
    .controller('enrolmentPdfCtrl', enrolmentPdfCtrl);
})();