(function() {

  var apiBaseRoute = "http://localhost:8080"

  var authenticationService = function($window, $http) {

    var b64Utf8 = function (string) {
      return decodeURIComponent(Array.prototype.map.call($window.atob(string), function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
    };

    var saveToken = function(token) {
      $window.localStorage['sis-token'] = token;
    };

    var returnToken = function() {
      return $window.localStorage['sis-token'];
    };

    var login = function(username, password) {
      var user = {
          username: username,
          password: password
      };
      return $http.post(apiBaseRoute+'/api/login', user).then(
        function success(res) {
          shraniZeton(res.data.zeton);
          return res.data.uporabnik._id;
        });
    };

    var logout = function() {
      $window.localStorage.removeItem('sis-token');
    };

    var isLoggedIn = function() {
      var token = returnToken();
      if (token) {
        var data = JSON.parse(b64Utf8(token.split('.')[1]));
        return data.datumPoteka > Date.now() / 1000;
      } else {
        return false;
      }
    };

    return {
      login: login,
      saveToken: saveToken,
      returnToken: returnToken,
      logout: logout,
      isLoggedIn: isLoggedIn
    };
  }

  angular
    .module('sis')
    .service('authenticationService', authenticationService);
})();
