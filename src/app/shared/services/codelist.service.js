(function() {

  var codelistService = function($http) {

    var getCodelists = function() {
      return $http.get(apiBaseRoute+'/api/codelists');
    };

    var getCodelist = function(codelistName) {
      return $http.get(apiBaseRoute + '/api/codelists/' + codelistName);
    };

    return {
      getCodelists: getCodelists,
      getCodelist: getCodelist,
    };
  };

  angular
    .module('sis')
    .service('codelistService', codelistService);
})();