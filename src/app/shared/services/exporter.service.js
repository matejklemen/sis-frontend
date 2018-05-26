(function() {
  var exporterService = function($window, $http) {

    var getFile = function(type, data, head, coloumnNames, inLegend, coloumnNamesFromAPI) {
      var obj = {};
      obj.head = head;
      obj.coloumnNames = coloumnNames;
      obj.rows = formRows(data, coloumnNamesFromAPI);
      obj.inLegend = inLegend ? inLegend : new Array(coloumnNames.length-1).fill(false);
      if(type == "pdf") {
        return $http.post(apiBaseRoute + '/api/dataexporter/tablepdf', obj, {
            headers: { 'Accept': 'application/pdf' },
            responseType : "arraybuffer"
          }
        ).then( function onSuccess(result) {
          var file = new Blob([result.data], {type: 'application/pdf'});
          console.log(result.headers());
          initiateFileDownload(file, result.headers("X-Export-Filename"));
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
          initiateFileDownload(file, result.headers("X-Export-Filename"));
        },
        function onFailure(error) {
          console.log(error);
        });
      } else {
        console.log("Unsupported type");
      }
    };

    function formRows(data, coloumnNamesFromAPI) {
      var rows = [];
      for(var i = 0; i < data.length; i++) {
        rows[i] = [];
        rows[i][0] = i+1;
        for(var cell in data[i]) {
          for(var j = 0; j < coloumnNamesFromAPI.length; j++) {
            var content = propertySelected(cell, data[i], coloumnNamesFromAPI[j]);
            if(content != null) {
              rows[i][j+1] = content;
            }
          }
        }
      }
      return rows;
    }

    function propertySelected(cell, data, coloumnName) {
      var props = coloumnName.split(".");
      if(props.length > 1) {
        if(props[0] == cell) {
          for(var new_cell in data[cell]) {
            var content = propertySelected(new_cell, data[cell], coloumnName.substring(coloumnName.indexOf(".")+1, coloumnName.length));
            if(content != null) {
              return content;
            }
          }
        } else {
          return null;
        }
      } else if (cell == props[0]) {
        if(data[cell] == null) {
          return "/"
        } else {
          return data[cell];
        }
      } else {
        return null;
      }
    }

    function initiateFileDownload(file, filename) {
      var fileUrl = $window.URL.createObjectURL(file);

      var caller = document.createElement("a");
      caller.id = "downloadCaller";
      caller.href = fileUrl;
      caller.download = filename;
      caller.style = "display: none;";

      document.body.append(caller);
      caller.click();
      caller.remove();

      $window.URL.revokeObjectURL(fileUrl);
    }

    var getPdfEnrolmentSheet = function(id){
      return $http.get(apiBaseRoute+'/api/dataexporter/enrolmentsheet/'+id, {responseType: 'arraybuffer'}).then(
        function onSuccess(result) {
          var file = new Blob([result.data], {type: 'application/pdf'});
          console.log(result.headers());
          initiateFileDownload(file, result.headers("X-Export-Filename"));
        },
        function onFailure(error) {
          console.log(error);
        }
      );
    };

    var getPdfEnrolmentConformation = function(id){
      return $http.get(apiBaseRoute+"/api/dataexporter/enrolmentconfirmation/"+id, {responseType: 'arraybuffer'}).then(
        function onSuccess(result) {
          var file = new Blob([result.data], {type: 'application/pdf'});
          console.log(result.headers());
          initiateFileDownload(file, result.headers("X-Export-Filename"));
        },
        function onFailure(error) {
          console.log(error);
        }
      );
    };

    var getPdfIndexPdf = function(id, full=false){
      return $http.get(apiBaseRoute+"/api/dataexporter/indexpdf/"+id+"?full="+full, {responseType: 'arraybuffer'}).then(
        function onSuccess(result) {
          var file = new Blob([result.data], {type: 'application/pdf'});
          console.log(result.headers());
          initiateFileDownload(file, result.headers("X-Export-Filename"));
        },
        function onFailure(error) {
          console.log(error);
        }
      );
    };

    var getPdfIndexCsv = function(id, full=false){
      return $http.get(apiBaseRoute+"/api/dataexporter/indexcsv/"+id+"?full="+full, {responseType: 'arraybuffer'}).then(
        function onSuccess(result) {
          var file = new Blob([result.data], {type: 'text/csv'});
          console.log(result.headers());
          initiateFileDownload(file, result.headers("X-Export-Filename"));
        },
        function onFailure(error) {
          console.log(error);
        }
      );
    };

    return {
      getFile: getFile,
      getPdfEnrolmentSheet: getPdfEnrolmentSheet,
      getPdfEnrolmentConformation: getPdfEnrolmentConformation,
      getPdfIndexPdf: getPdfIndexPdf,
      getPdfIndexCsv: getPdfIndexCsv,
    };
  };

  angular
    .module('sis')
    .service('exporterService', exporterService);
})();
