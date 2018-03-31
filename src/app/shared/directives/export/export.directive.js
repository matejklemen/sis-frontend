(function(){
  var exportTable = function(){
    var link = function($scope, elm, attr){

    $scope.$on('export-pdf', function(e, d){
          elm.tableExport({type:'pdf', escape:'false', ignoreColumn:(d.ignore ? d.ignore : [])});
     });

    $scope.$on('export-csv', function(e, d){
           elm.tableExport({type:'csv', escape:'false', ignoreColumn:(d.ignore ? d.ignore : [])});
     });

  }

  return {
    restrict: 'C',
    link: link
   }
}

angular
 .module('sis')
 .directive('exportTable', exportTable);
})();
