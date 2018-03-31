(function() {

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
      return $http.post(apiBaseRoute+'/api/login', user, {headers:{'Content-Type': 'application/json'}}).then(
        function success(res) {
          saveToken(res.data.token);
          return res.data.username;
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
    };

    var isLoggedIn = function() {
      var token = returnToken();
      if (token) {
        var data = JSON.parse(b64Utf8(token.split('.')[1]));
        return data.exp > Date.now() / 1000;
      } else {
        return false;
      }
    };

    var getUsername = function() {
      var token = returnToken();
      if (token) {
        var data = JSON.parse(b64Utf8(token.split('.')[1]));
        return data.sub;
      } else {
        return false;
      }
    };

    var getRole = function() {
      var token = returnToken();
      if (token) {
        var data = JSON.parse(b64Utf8(token.split('.')[1]));
        return data.role;
      } else {
        return false;
      }
    };

    return {
      login: login,
      passwordReset: passwordReset,
      passwordChange: passwordChange,
      saveToken: saveToken,
      returnToken: returnToken,
      logout: logout,
      isLoggedIn: isLoggedIn,
      getUsername: getUsername
    };
  }

  angular
    .module('sis')
    .service('authenticationService', authenticationService);
})();
