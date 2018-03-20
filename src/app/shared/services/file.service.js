(function() {

  var apiBaseRoute = "http://localhost:8080"

  var fileService = function($http) {
    var putFile = function(uploadedFile) {
      var params = {
        fileData: uploadedFile
      };
      return $http.put(apiBaseRoute+'/api/file', params);
    };

    return {
      putFile: putFile,
    };
  };

  angular
    .module('sis')
    .service('fileService', fileService);
})();