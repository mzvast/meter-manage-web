'use strict';

/**
 * @ngdoc service
 * @name manageApp.dataManager
 * @description
 * # dataManager
 * Service in the manageApp.
 */
angular.module('manageApp')
  .service('dataManager', ['$http','$resource',function ($http,$resource) {
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
      //////////////////////
      // products resource//
      //////////////////////
      self.products = $resource('/api/v2/products/:id',
          {
            id:'@id'         
          },
          {
            update:
            {
              method:'PUT'
            }
          }
      );
      
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
