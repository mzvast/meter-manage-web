'use strict';

/**
 * @ngdoc service
 * @name manageApp.dataManager
 * @description
 * # dataManager
 * Service in the manageApp.
 */
angular.module('manageApp')
  .service('dataManager', ['$http',function ($http) {
      // AngularJS will instantiate a singleton by calling "new" on this function
      var self = this;
      self.notifications = [];
      self.getProducts = function() {
      	return $http.get('/api/products');
      };
      self.createProduct = function(data) {
        return $http.post('/api/products',data);
      };
      self.updateProduct = function(data,id) {
      	return $http.put('/api/products/'+id,data);
      };
      self.addNotification = function(type,message) {
      	self.notifications.push({"type":type,"message":message});
      };
      self.getNotifications = function() {
      	return self.notifications;
      };
      self.removeNotification = function(index) {
        self.notifications.splice(index,1);
      };
      self.removeProduct = function(id) {
        return $http.delete('/api/products/'+id);
      };
    }]);
