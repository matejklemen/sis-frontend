(function() {

  var authenticationService = function($window, $http) {

    var b64Utf8 = function (string) {
      return decodeURIComponent(Array.prototype.map.call($window.atob(string), function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
    };

    var setToken = function(token) {
      $window.localStorage['sis-token'] = token;
    };

    var getToken = function() {
      return $window.localStorage['sis-token'];
    };

    var login = function(username, password) {
      var user = {
          username: username,
          password: password
      };
      return $http.post(apiBaseRoute+'/api/login', user, {headers:{'Content-Type': 'application/json'}}).then(
        function success(res) {
          setToken(res.data);
          return getUsername();
        },
        function error(res) {
          throw res;
        }
      );
    };

    var passwordReset = function(email) {
      var user = {
          username: email
      };
      return $http.post(apiBaseRoute+'/api/login/reset-password', user, {headers:{'Content-Type': 'application/json'}}).then(
        function success(res) {
          return true;
        },
        function error(res) {
          throw res;
        }
      );
    };

    var passwordChange = function(token, password) {
      var user = {
        newPassword: password,
        jwtToken: token
      };
      return $http.post(apiBaseRoute+'/api/login/change-password', user, {headers:{'Content-Type': 'application/json'}}).then(
        function success(res) {
          return true;
        },
        function error(res) {
          throw res;
        }
      );
    };

    var logout = function() {
      $window.localStorage.removeItem('sis-token');
      // remove all temp saved data
      $window.localStorage.removeItem('lastTabIndex');
      $window.localStorage.removeItem('studentListSearchQuery');
    };

    var isLoggedIn = function() {
      var token = getToken();
      if (token) {
        var data = JSON.parse(b64Utf8(token.split('.')[1]));
        return data.exp > Date.now() / 1000;
      } else {
        return false;
      }
    };

    var getUsername = function() {
      var token = getToken();
      if (token) {
        var data = JSON.parse(b64Utf8(token.split('.')[1]));
        return data.username;
      } else {
        return false;
      }
    };

    var getLoginId = function() {
      var token = getToken();
      if (token) {
        var data = JSON.parse(b64Utf8(token.split('.')[1]));
        return data.loginId;
      } else {
        return false;
      }
    };

    var getRole = function() {
      var token = getToken();
      if (token) {
        var data = JSON.parse(b64Utf8(token.split('.')[1]));
        return data.role;
      } else {
        return false;
      }
    };

    var getIdentity = function() {
      var token = getToken();
      if (token) {
        var data = JSON.parse(b64Utf8(token.split('.')[1]));
        return data.identity;
      } else {
        return false;
      }
    };

    return {
      setToken: setToken,
      getToken: getToken,
      login: login,
      passwordReset: passwordReset,
      passwordChange: passwordChange,
      logout: logout,
      isLoggedIn: isLoggedIn,
      getUsername: getUsername,
      getLoginId: getLoginId,
      getRole: getRole,
      getIdentity: getIdentity,
    };
  };

  angular
    .module('sis')
    .service('authenticationService', authenticationService);
})();
