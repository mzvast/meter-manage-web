'use strict';

/**
 * @ngdoc service
 * @name manageApp.authGuard
 * @description
 * # authGuard
 * Service in the manageApp.
 */
angular.module('manageApp')
  .service('authGuard', authGuard);

authGuard.$inject = ['authService','$state'];

function authGuard(authService,$state) {
  // console.log("authGuard init");
  var self = this;
  self.toggleMode = function (state) {
    self.isLoggedIn = state;
    self.isAdmin = state;
    self.isManage = state;
    self.isTester = state;
    self.debugMode = state;
  };

  function isDebug() {
    return self.debugMode;
  }

  /**
   * debug toggle!!!!!!!!!
   */
  self.toggleMode(true);

  function setRoleFlag() {
    var role = +self.user.role;
    console.log('setting role',role);
    if(role&4) self.isAdmin = true;
    if(role&2) self.isManage = true;
    if(role&1) self.isTester = true;
  }

  function clearRoleFlag() {
    console.log('clear role flag');
    self.toggleMode(false);
    // self.isAdmin = false;
    // self.isManage = false;
    // self.isTester = false;
  }

  self.isAuthenticated =function (toState) {
    if(isDebug()) return true;
    if(toState===undefined) return;
    var res = self.isLoggedIn&&authService.hasPermission(toState.name);
    console.log('check permission to ',toState.name,res?':yes':':no');
    return res;
  };

  self.hasToken = function () {
    console.log(authService.token);
    return !!authService.token;
  };

  function User(id,name,role) {
    var self = this;
    this.id = id;
    this.name = name;
    this.role = role;
    this.roleName = (function () {
      var roleNum = +self.role;
      console.log(roleNum);
      if(roleNum&4) {
        return '超级管理员';
      }
      else if(roleNum&2){
        return '管理员';
      }else if(roleNum&1){
        return '测试执行员';
      }
    }());
  }

  self.getUser  = function () {
    return self.user
  };

  self.login = function (username,password,nextState) {
    if(arguments.length===1){
      nextState = username;
      authService.doLoginByToken(cb);
    }else{
      authService.doLoginByPass(username,password,cb);
    }
    function cb(response,userinfo) {
      if(response){
        console.log("logged in");
        self.isLoggedIn = response;
        self.user = new User(userinfo.id,userinfo.name,userinfo.type);
        setRoleFlag();
        // console.log(nextState);
        $state.go(nextState);
      }
    }

  };

  self.logout = function () {
    console.log("logged out");
    authService.doLogout();
    // self.isLoggedIn = false;
    clearRoleFlag();
  };

  self.nextState = 'home';

  self.setNextState = function (toState) {
    if(toState==='login') return;
    console.log('>>nextState:',toState);
      self.nextState = toState;
  };

  self.getNextState = function () {
    return self.nextState;
  }
}
