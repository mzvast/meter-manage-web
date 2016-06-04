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
        // debug config //
        //////////////////
        self.debugStatus = true;//控制全局的console调试
        var configDebugFn = function(value) {
          if (value===undefined) {
            console.log("调试选项配置异常");
            return;
          }
          var debug = !value;
          value?console.log("调试模式已打开"):console.log("调试模式已关闭");
          return function(content) {
            debug||console.log(content);
          }
        };
        self.log = function() {
          return configDebugFn(self.debugStatus)
        }
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

        ///////////////////
        //requirements resource //
        ///////////////////
        self.requirements = $resource('/api/v2/requirements/:id', {
            id: '@id'
        }, {
            update: {
                method: 'PUT'
            }
        });

    }]);
