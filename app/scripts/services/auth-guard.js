'use strict';

/**
 * @ngdoc service
 * @name manageApp.authGuard
 * @description
 * # authGuard
 * Service in the manageApp.
 */
angular.module('manageApp')
  .service('authGuard', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var vm = this;
    vm.isLoggedIn = false;
    vm.login = function () {
      console.log("logged in");
      vm.isLoggedIn = true;
    };
    vm.logout = function () {
      console.log("logged out");
      vm.isLoggedIn = false;
    }
  });
