(function() {

  var codelistService = function($http) {

    var getCodelists = function() {
      return $http.get(apiBaseRoute+'/api/codelists');
    };

    var getCodelist = function(codelistName) {
      return $http.get(apiBaseRoute + '/api/codelists/' + codelistName);
    };

    var putEntry = function(apiEndpointName, entryObject) {
      return $http.put(apiBaseRoute + '/api/' + apiEndpointName, entryObject);
    };

    var postEntry = function(apiEndpointName, entryObject) {
      return $http.post(apiBaseRoute + '/api/' + apiEndpointName, entryObject);
    };

    var deleteEntry = function(apiEndpointName, entryObject) {
      return $http.delete(apiBaseRoute + '/api/' + apiEndpointName + '/' + entryObject.id);
    };

    return {
      getCodelists: getCodelists,
      getCodelist: getCodelist,
      putEntry: putEntry,
      postEntry: postEntry,
      deleteEntry: deleteEntry
    };
  };

  angular
    .module('sis')
    .service('codelistService', codelistService);
})();