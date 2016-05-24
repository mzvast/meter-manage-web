'use strict';

/**
 * @ngdoc function
 * @name manageApp.controller:NotificationCtrl
 * @description
 * # NotificationCtrl
 * Controller of the manageApp
 */
angular.module('manageApp')
  .controller('NotificationCtrl', ['dataManager',function (dataManager) {
    	var self = this;
      self.notifications = dataManager.getNotifications();
      self.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];
      
      self.closeAlert = function(index) {
        dataManager.removeNotification(index);
      };
    }]);
