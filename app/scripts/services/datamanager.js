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
        self.debugStatus = true; //控制全局的console调试
        var configDebugFn = function(value) {
            if (value === undefined) {
                console.log("调试选项配置异常");
                return;
            }
            var debug = !value;
            // value?console.log("调试模式已打开"):console.log("调试模式已关闭");
            return function(content) {
                debug || console.log(content);
            }
        };
        self.log = function() {
            return configDebugFn(self.debugStatus)
        }
        var log = self.log();
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
        //////////////////
        // envs resource //
        //////////////////
        self.envs = $resource('/api/v2/envs/:id', {
            id: '@id'
        }, {
            update: {
                method: 'PUT'
            }
        });

        //////////////////
        // plans resource //
        //////////////////
        self.plans = $resource('/api/v2/plans/:id', {
            id: '@id'
        }, {
            update: {
                method: 'PUT'
            }
        });
        //////////////
        // CRUD构造函数 //
        //////////////
        self.R = function(resourceName, vm) {
            return function(queryObj) {
                log("queryObj=");
                log(queryObj);
                self[resourceName].get(queryObj).$promise
                    .then(function(response) {
                        log("获取" + vm.pageResourceName + " SUCCESS!");
                        // console.dir(response);
                        // console.dir(response.json);
                        vm.itemList = response.json;
                        vm.totalItems = response.total_items;
                    });
            };
        };
        self.C = function(resourceName, vm) {
            return function(formObj) {
                log("formObj=");
                log(formObj);
                self[resourceName].save({ "json": formObj }).$promise
                    .then(function() {
                        log("新增资源 SUCCESS!");
                        // console.log(data);
                        self.addNotification("success", "新" + vm.pageResourceName + "创建成功");
                        vm.get();
                    });
            };
        };
        self.U = function(resourceName, vm) {
            return function(formObj) {
                log("formObj=");
                log(formObj);
                self[resourceName].update({
                        id: formObj.id
                    }, { "json": formObj }).$promise
                    .then(function() {
                        log("修改资源 SUCCESS!");
                        // console.log(data);
                        self.addNotification("success", vm.pageResourceName + formObj.id + "修改成功");
                        vm.get();
                    });
            };
        };
        self.D = function(resourceName, vm) {
            return function(id) {
                log("id=" + id);
                self[resourceName].delete({
                        id: id
                    }).$promise
                    .then(function() {
                        log("删除资源 SUCCESS!");
                        // console.log(data);
                        self.addNotification("success", vm.pageResourceName + id + "删除成功");
                        vm.get();
                    });
            };
        };
    }]);
