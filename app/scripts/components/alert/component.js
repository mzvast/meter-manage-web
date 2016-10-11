/**
 * Created by mzvast on 2016/10/11.
 */
'use strict';
angular.module('manageApp')
  .component('alertComponent', {
    templateUrl: 'scripts/components/alert/component.html',
    bindings: {

    },
    controller: function($document,notificationService) {
      var $ctrl = this;

      $ctrl.notifications = notificationService.notifications;
      $ctrl.closeAlert = function (index) {
        notificationService.removeNotification(index);
      }
    },
  });
