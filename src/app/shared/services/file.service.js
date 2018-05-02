(function() {

  var fileService = function($http) {
    var putFile = function(uploadedFile) {
      var params = {
        fileData: uploadedFile
      };
      return $http.put(apiBaseRoute+'/api/files', params);
    };

    var getEnrolmentSheet = function(id){
      return $http.get(apiBaseRoute+'/api/dataexporter/enrolmentsheet/'+id, {responseType: 'arraybuffer'});
    }

    var getEnrolmentConformation = function(id){
      return $http.get(apiBaseRoute+"/api/dataexporter/enrolmentconfirmation/"+id, {responseType: 'arraybuffer'});
    }

    return {
      putFile: putFile,
      getEnrolmentSheet: getEnrolmentSheet,
      getEnrolmentConformation: getEnrolmentConformation,
    };
  };

  angular
    .module('sis')
    .service('fileService', fileService);
})();
