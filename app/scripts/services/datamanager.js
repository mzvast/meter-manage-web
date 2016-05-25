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
      self.getProducts = function(itemsPerPage,currentPage,orderBy,reverse) {
        if (!itemsPerPage) {itemsPerPage=10;} 
        if (!currentPage) {currentPage=1;} 
        if (!orderBy) {orderBy='id';}
        var url = [];
            url.push('items_per_page='+itemsPerPage);
            url.push('current_page='+currentPage);
            url.push('order_by='+orderBy);
            url.push('reverse='+reverse);
            url = url.join('&');
            url = '/api/products?'+url;
        console.log(url);
        return $http.get(url);
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
      self.getUsers = function(itemsPerPage,currentPage) {
        if (!itemsPerPage) {itemsPerPage=10;} 
        if (!currentPage) {currentPage=1;}
        return $http.get('/api/users?items_per_page='+itemsPerPage+'&current_page='+currentPage);
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
