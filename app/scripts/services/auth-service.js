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

authService.$inject = ['$http'];

function authService($http) {
  // console.log("authService init");
  var self = this;
  // self.authStatus = false;
  self.role = 0;
  refreshToken();//get token 1st time;

  function refreshToken() {
    self.token = localStorage.getItem('token');
  }

  /////////////////////////////////
  //login with username|password //
  /////////////////////////////////
  self.doLoginByPass = function(username,password,cb) {
    $http
      .post('/api/v2/users/login',{
        name:username,
        password:password
      })
      .success(function(data, status, headers, config) {
        console.log('获取token:'+headers('token'));
        console.log(data);
        switch(data.state){
          case 'success':
          {
            self.token=headers('token')||data.data.token;//正式服务器header中有token，rap中只能在response中
            localStorage.setItem('token', self.token);
            self.role = data.data.type;//设置role
            cb(true,data.data);
            break;
          }
          default:
          {
            cb(false);
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
  self.doLoginByToken = function(cb) {
    $http
      .post('/api/v2/users/login',{
        token:self.token
      })
      .success(function(data, status, headers, config) {
        console.log(data);
        switch(data.state){
          case 'success':
          {
            self.role = data.data.type;//设置role
            cb(true,data.data);
            break;
          }
          default:
          {
            localStorage.removeItem('token');//remove invalid token of localStorage
            cb(false);
          }
        }

      })
      .error(function(data, status, headers, config) {
        console.log('网络异常');
        console.log(data);
        return false;
      });
  };


  self.doLogout =function() {
    localStorage.removeItem('token');
    self.role = 0;
    refreshToken();
    // self.authStatus = false;
    return true;
  };

  self.hasPermission = function (name) {

    return checkPermission(getRequireByStateName(name),self.role);
  };

  function getRequireByStateName(name) {//菜单权限表
    if(name&&name.toLowerCase().startsWith('manage')){
      return '110';
    }else {
      switch (name){
        case 'admin':{
          return '100';
        }
      }
      return '111';
    }
  }

  function checkPermission (require,role) {
    console.log('require:',require,',role:',role.toString(2));
    return parseInt(require,2)&role;
  }


}
