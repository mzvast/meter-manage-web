'use strict';

/**
 * @ngdoc function
 * @name manageApp.controller:NotificationCtrl
 * @description
 * # NotificationCtrl
 * Controller of the manageApp
 */
angular.module('manageApp')
  .controller('NotificationCtrl', NotificationCtrl);

NotificationCtrl.$inject = ['dataManager'];

function NotificationCtrl(dataManager) {
  var vm = this;
  vm.notifications = dataManager.getNotifications();
  vm.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];

  vm.closeAlert = function(index) {
    dataManager.removeNotification(index);
  };
}
