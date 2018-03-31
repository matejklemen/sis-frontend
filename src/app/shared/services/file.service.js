(function() {

  var fileService = function($http) {
    var putFile = function(uploadedFile) {
      var params = {
        fileData: uploadedFile
      };
      return $http.put(apiBaseRoute+'/api/files', params);
    };

    return {
      putFile: putFile,
    };
  };

  angular
    .module('sis')
    .service('fileService', fileService);
})();