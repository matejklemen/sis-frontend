(function() {

  var codelistService = function($http) {

    var getCodelists = function() {
      return $http.get(apiBaseRoute+'/api/codelists');
    };

    var getCodelist = function(codelistEndpointName) {
      return $http.get(apiBaseRoute + '/api/' + codelistEndpointName);
    };

    var getCodelistDeleted = function(codelistEndpointName) {
      return $http.get(apiBaseRoute + '/api/' + codelistEndpointName + '?deleted=true');
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

    var restoreEntry = function(apiEndpointName, entryObject) {
      // JUST CALL DELETE AGAIN LMAO PLEASE THIS IS SO BAD BUT THERE IS NO TIME
      return $http.delete(apiBaseRoute + '/api/' + apiEndpointName + '/' + entryObject.id);
    };

    return {
      getCodelists: getCodelists,
      getCodelist: getCodelist,
      getCodelistDeleted: getCodelistDeleted,
      putEntry: putEntry,
      postEntry: postEntry,
      deleteEntry: deleteEntry,
      restoreEntry: restoreEntry
    };
  };

  angular
    .module('sis')
    .service('codelistService', codelistService);
})();