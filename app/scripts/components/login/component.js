/**
 * Created by mzvast on 2016/10/11.
 */
'use strict';
angular.module('manageApp')
  .component('loginComponent', {
    templateUrl: 'scripts/components/login/component.html',
    bindings: {

    },
    controller: loginController
  });

loginController.$inject = ['authGuard','$state'];

function loginController(authGuard,$state) {
  var $ctrl = this;
  $ctrl.onSubmit = function () {
    authGuard.login();
    $state.go('manage',{category:'products'})
  }

}
