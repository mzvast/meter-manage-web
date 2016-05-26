'use strict';

/**
 * @ngdoc service
 * @name manageApp.dataManager
 * @description
 * # dataManager
 * Service in the manageApp.
 */
angular.module('manageApp')
    .service('dataManager', ['$http', '$resource', function($http, $resource) {
        // AngularJS will instantiate a singleton by calling "new" on this function
        var self = this;
        //////////////////
        //notifications //
        //////////////////
        self.notifications = [];
        self.addNotification = function(type, message) {
            self.notifications.push({ "type": type, "message": message });
        };
        self.getNotifications = function() {
            return self.notifications;
        };
        self.removeNotification = function(index) {
            self.notifications.splice(index, 1);
        };
        //////////////////////
        // products resource//
        //////////////////////
        self.products = $resource('/api/v2/products/:id', {
            id: '@id'
        }, {
            update: {
                method: 'PUT'
            }
        });
        ///////////////////
        //users resource //
        ///////////////////
        self.users = $resource('/api/v2/users/:id', {
            id: '@id'
        }, {
            update: {
                method: 'PUT'
            }
        });

    }]);
