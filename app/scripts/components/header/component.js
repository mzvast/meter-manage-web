/**
 * Created by mzvast on 2016/10/12.
 */
'use strict';
angular.module('manageApp')
  .component('headerComponent', {
    templateUrl: 'scripts/components/header/component.html',
    bindings: {

    },
    controller: function(authGuard,$state) {
      var $ctrl = this;
      $ctrl.authGuard = authGuard;

      $ctrl.login = function () {
        $state.go('login');
      };

      $ctrl.logout = function () {
        authGuard.logout();
        $state.transitionTo("login");
      }




    },
  });