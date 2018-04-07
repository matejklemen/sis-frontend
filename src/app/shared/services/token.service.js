(function() {

  var tokenService = function($http) {
    var putToken = function(id) {
      return $http.put(apiBaseRoute+'/api/tokens/'+id);
    };

    var getTokenByStudentId = function(id) {
      return $http.get(apiBaseRoute+'/api/tokens?studentId='+id);
    };

    var deleteToken = function(id){
      return $http.delete(apiBaseRoute+'/api/tokens/'+id);
    }

    var postToken = function(token){
      return $http.post(apiBaseRoute+'/api/tokens',token);
    }

    return {
      putToken: putToken,
      getTokenByStudentId: getTokenByStudentId,
      deleteToken: deleteToken,
      postToken: postToken,
    };
  };

  angular
    .module('sis')
    .service('tokenService', tokenService);
})();