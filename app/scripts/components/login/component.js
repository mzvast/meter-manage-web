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
  var nextState;

  $ctrl.$onInit = function () {
    $ctrl.username = 'test_admin';
    $ctrl.password = 'test_admin';
    nextState = authGuard.getNextState()||'home';
    // console.log('nextState:',nextState);

    if(authGuard.hasToken()){
      authGuard.login(nextState);
    }

  };

  $ctrl.onSubmit = function () {
    console.log($ctrl.username,$ctrl.password);
    authGuard.login($ctrl.username,$ctrl.password,nextState);
  }

}
