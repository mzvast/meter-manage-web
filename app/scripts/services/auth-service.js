'use strict';

/**
 * @ngdoc service
 * @name manageApp.AuthService
 * @description
 * # AuthService
 * Service in the manageApp.
 */
angular.module('manageApp')
  .service('authService', authService);

authService.$inject = ['$cookies','$http'];

function authService($cookies, $http) {
  // AngularJS will instantiate a singleton by calling "new" on this function
  var self = this;
  self.authStatus = false;
  self.token = $cookies.get('token')||'default token';

  self.doLogin = function(username,password) {
    if (self.token.length>0) {
      // console.log("invoke doLoginByToken");
      return self.doLoginByToken();
    } else {
      // console.log("invoke doLoginByPass");
      return self.doLoginByPass(username,password);
    }
  };

  /////////////////////////////////
  //login with username|password //
  /////////////////////////////////
  self.doLoginByPass = function(username,password) {
    $http
      .post('/api/login',{
        username:username,
        password:password
      })
      .success(function(data, status, headers, config) {
        switch(data.status){
          case 'success':
          {
            self.token=data.token;
            self.authStatus = true;
            $cookies.put('token', self.token);//set token to cookies
            return true;
            // break;
          }
          default:
          {
            self.authStatus = false;
            return false;
          }
        }
      })
      .error(function(data, status, headers, config) {
        console.log('网络异常');
        console.log(data);
        return false;
      });
  };


  //////////////////////
  //login with token  //
  //////////////////////
  self.doLoginByToken = function() {
    $http
      .post('/api/verifytoken',{
        token:self.token
      })
      .success(function(data, status, headers, config) {
        switch(data.status){
          case 'success':
          {
            self.authStatus = true;
            return true;
            // break;
          }
          default:
          {
            self.authStatus = false;  //ensure not authurized
            $cookies.remove('token');//remove invalid token of cookies
            return false;
          }
        }

      })
      .error(function(data, status, headers, config) {
        console.log('网络异常');
        console.log(data);
        return false;
      });
  };


  self.isAuthenticated = function() {
    return self.authStatus;
  };
  self.doLogout =function() {
    self.authStatus = false;
    return true;
  };

  // Setting a cookie
  $cookies.put('myFavorite', 'oatmeal');
  // Retrieving a cookie
  var favoriteCookie = $cookies.get('myFavorite');
  // console.log("msg",favoriteCookie);
  self.setCookies = function() {
  };
}
