(function() {
  var exporterService = function($window, $http) {

    var getFile = function(type, data, tableName, coloumnNames, coloumnNamesFromAPI) {
      var obj = {};
      obj.tableName = tableName;
      obj.coloumnNames = coloumnNames;
      obj.rows = formRows(data, coloumnNamesFromAPI);
      if(type == "pdf") {
        return $http.post(apiBaseRoute + '/api/dataexporter/tablepdf', obj, {
            headers: { 'Accept': 'application/pdf' },
            responseType : "arraybuffer"
          }
        ).then( function onSuccess(result) {
          var file = new Blob([result.data], {type: 'application/pdf'});
          var fileURL = URL.createObjectURL(file);
          $window.open(fileURL, '_self', '');
        },
        function onFailure(error) {
          console.log(error);
        });
      } else if( type == "csv") {
        return $http.post(apiBaseRoute + '/api/dataexporter/tablecsv', obj, {
            headers: { 'Accept': 'text/csv' },
            responseType : "arraybuffer"
          }
        ).then( function onSuccess(result) {
          var file = new Blob([result.data], {type: 'text/csv'});
          var fileURL = URL.createObjectURL(file);
          var a = document.createElement("a");
          document.body.appendChild(a);
          a.style = "display: none";
          a.href = fileURL;
          a.download = tableName+".csv";
          a.click();
          window.URL.revokeObjectURL(fileURL);
        },
        function onFailure(error) {
          console.log(error);
        });
      } else {
        console.log("Unsupported type");
      }
    };

    var formRows = function(data, coloumnNames) {
      var rows = [];
      var i = 0;
      for(var i = 0; i < data.length; i++) {
        rows[i] = [];
        rows[i][0] = i+1;
        for(cell in data[i]) {
          if(coloumnNames.indexOf(cell) >= 0) {
            rows[i][coloumnNames.indexOf(cell)+1] = data[i][cell];
          }
        }
      }
      return rows;
    }

    return {
      getFile: getFile
    };
  };

  angular
    .module('sis')
    .service('exporterService', exporterService);
})();
