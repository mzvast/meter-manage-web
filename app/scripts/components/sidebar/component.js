/**
 * Created by mzvast on 2016/10/11.
 */
'use strict';
angular.module('manageApp')
  .component('sidebarComponent', {
    templateUrl: 'scripts/components/sidebar/component.html',
    bindings: {

    },
    controller: function(authGuard) {
      var $ctrl = this;
      $ctrl.authGuard = authGuard;
      $ctrl.$onInit = function () {
        console.log(authGuard.isLoggedIn)
      }

    },
  });
