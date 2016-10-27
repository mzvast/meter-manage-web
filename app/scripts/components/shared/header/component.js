/**
 * Created by mzvast on 2016/10/12.
 */
'use strict';
angular.module('manageApp')
  .component('headerComponent', {
    templateUrl: 'scripts/components/shared/header/component.html',
    bindings: {

    },
    controller: headerController
  });

headerController.$inject = ['authGuard','$state'];

function headerController(authGuard,$state) {
  var $ctrl = this;

  $ctrl.toggleMode = function () {
    authGuard.toggleMode(!authGuard.debugMode)
  };
  $ctrl.authGuard = authGuard;

  $ctrl.login = function () {
    $state.go('login');
  };

  $ctrl.logout = function () {
    authGuard.logout();
    $state.transitionTo("home");
  }




}
