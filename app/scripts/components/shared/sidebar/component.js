/**
 * Created by mzvast on 2016/10/11.
 */
'use strict';
angular.module('manageApp')
  .component('sidebarComponent', {
    templateUrl: 'scripts/components/shared/sidebar/component.html',
    bindings: {

    },
    controller: sidebarController
  });

sidebarController.$inject = ['authGuard'];

function sidebarController(authGuard) {
  var $ctrl = this;
  $ctrl.authGuard = authGuard;
  $ctrl.$onInit = function () {
    console.log(authGuard.isLoggedIn)
  }

}
