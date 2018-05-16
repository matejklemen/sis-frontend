(function() {

  var codelistService = function($http) {

    var getCodelists = function() {
      return $http.get(apiBaseRoute+'/api/codelists');
    };

    var getCodelist = function(codelistEndpointName) {
      return $http.get(apiBaseRoute + '/api/' + codelistEndpointName + '?filter=deleted:EQ:false');
    };

    var getCodelistOrdered = function(codelistEndpointName, order) {
      return $http.get(apiBaseRoute + '/api/' + codelistEndpointName + '?filter=deleted:EQ:false&order=' + order);
    };

    var getCodelistAll = function(codelistEndpointName, offset, limit, search = '') {
      if(search == '') {
        return $http.get(apiBaseRoute + '/api/' + codelistEndpointName + '?offset=' + offset + '&limit=' + limit + '&order=id ASC');
      } else {
        return $http.get(apiBaseRoute + '/api/' + codelistEndpointName + '?offset=' + offset + '&limit=' + limit + '&order=id ASC&search=' + search.trim());
      }
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
      getCodelistOrdered: getCodelistOrdered,
      getCodelistAll: getCodelistAll,
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