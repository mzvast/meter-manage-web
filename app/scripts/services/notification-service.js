'use strict';

/**
 * @ngdoc service
 * @name manageApp.notificationService
 * @description
 * # notificationService
 * Service in the manageApp.
 */
angular.module('manageApp')
  .service('notificationService', notificationService);

notificationService.$inject = [];

function notificationService() {
  // AngularJS will instantiate a singleton by calling "new" on this function
  var self = this;
  self.notifications = [];
  self.addNotification = function (type, message) {
    self.notifications.push({"type": type, "message": message});
  };
  self.getNotifications = function () {
    return self.notifications;
  };
  self.removeNotification = function (index) {
    self.notifications.splice(index, 1);
  };

  //short alias
  self.add = self.addNotification;
  self.get = self.getNotification;
  self.remove = self.removeNotification;
}
