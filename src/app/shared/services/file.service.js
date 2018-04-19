(function() {

  var fileService = function($http) {
    var putFile = function(uploadedFile) {
      var params = {
        fileData: uploadedFile
      };
      return $http.put(apiBaseRoute+'/api/files', params);
    };

    var getFile = function(){
      return $http.post(apiBaseRoute+'/api/dataexporter/tablepdf',null,{responseType: 'arraybuffer'});
    }

    return {
      putFile: putFile,
      getFile: getFile,
    };
  };

  angular
    .module('sis')
    .service('fileService', fileService);
})();