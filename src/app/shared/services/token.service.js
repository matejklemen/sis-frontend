(function() {

  var tokenService = function($http) {
    var putToken = function(id) {
      return $http.put(apiBaseRoute+'/api/tokens/'+id);
    };

    return {
      putToken: putToken,
    };
  };

  angular
    .module('sis')
    .service('tokenService', tokenService);
})();