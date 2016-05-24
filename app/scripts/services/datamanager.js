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
      //////////////////
      //notifications //
      //////////////////
      self.notifications = [];
      self.addNotification = function(type,message) {
      	self.notifications.push({"type":type,"message":message});
      };
      self.getNotifications = function() {
      	return self.notifications;
      };
      self.removeNotification = function(index) {
        self.notifications.splice(index,1);
      };
      //////////////
      // products //
      //////////////
      self.getProducts = function(size,page) {
        if (!size) {size=10;} 
        if (!page) {page=1;} 
        return $http.get('/api/products?size='+size+'&page='+page);
      };
      self.createProduct = function(data) {
        return $http.post('/api/products',data);
      };
      self.updateProduct = function(data,id) {
        return $http.put('/api/products/'+id,data);
      };
      self.removeProduct = function(id) {
        return $http.delete('/api/products/'+id);
      };
      //////////
      //users //
      //////////
      self.getUsers = function(size,page) {
        if (!size) {size=10;} 
        if (!page) {page=1;} 
        return $http.get('/api/users?size='+size+'&page='+page);
      };
      self.createUser = function(data) {
        return $http.post('/api/users',data);
      };
      self.updateUser = function(data,id) {
        return $http.put('/api/users/'+id,data);
      };
      self.removeUser = function(id) {
        return $http.delete('/api/users/'+id);
      };
    }]);
