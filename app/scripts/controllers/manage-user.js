'use strict';

/**
 * @ngdoc function
 * @name manageApp.controller:ManageUserCtrl
 * @description
 * # ManageUserCtrl
 * Controller of the manageApp
 */
angular.module('manageApp')
    .controller('ManageUserCtrl', ['dataManager', function(dataManager) {
        var self = this;
        self.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
        ////////////////
        // sort //
        ////////////////
        self.predicate = 'id';
        self.reverse = true;
        self.order = function(predicate) {
            self.reverse = (self.predicate === predicate) ? !self.reverse : false;
            self.predicate = predicate;
            self.getUsers();
        };
        ////////////////
        //Pagination  //
        ////////////////
        // self.totalItems = 100;
        self.currentPage = 1;
        self.itemsPerPage = 10;
        self.maxSize = 5; //显示的时候页码的最多个数，忽略该参数

        // self.setPage = function (pageNo) {
        // 	self.currentPage = pageNo;
        // };
        
        /////////////
        // search //
        /////////////
        self.search = function(q) {
        	console.log("q="+q);
        	self.currentPage = 1;
            dataManager.users.get({
                    current_page: self.currentPage,
                    items_per_page: self.itemsPerPage,
                    order_by: self.predicate,
                    q:q,
                    reverse: self.reverse
                }).$promise
                .then(function(response) {
                    console.log("搜索用户 SUCCESS!");
                    // console.dir(response);
                    self.users = response.json;
                    self.totalItems = response.total_items;
                });
        };
        self.resetSearch =function() {
        	self.q = "";
        	self.currentPage = 1;
        	self.getUsers();
        };
        //////////
        //Users //
        //////////
        self.pageChanged = function() {
            console.log('Page changed to: ' + self.currentPage);
            self.getUsers();
        };
        self.getUsers = function() {
            dataManager.users.get({
                    current_page: self.currentPage,
                    items_per_page: self.itemsPerPage,
                    order_by: self.predicate,
                    reverse: self.reverse
                }).$promise
                .then(function(response) {
                    console.log("获取用户 SUCCESS!");
                    // console.dir(response);
                    self.users = response.json;
                    self.totalItems = response.total_items;
                });

        };

        self.getUsers();

        self.setModal = function(user) {
            self.selectedUser = user;
        };
        self.setNewModal = function() {
            self.newUser = null;
        };

        self.createUser = function() {
            // self.newProduct.create_date = (new Date()).toISOString().slice(0, 10);
            console.log({ "json": self.newUser });
            dataManager.users.save({ "json": self.newUser }).$promise
                .then(function() {
                    console.log("新增用户 SUCCESS!");
                    // console.log(data);
                    dataManager.addNotification("success", "新用户创建成功");
                    self.getUsers();
                });
        };
        
        self.updateUser = function() {
            // console.log({"json":self.selectedUser});
            dataManager.products.update({
                    id: self.selectedUser.id
                }, {
                    "json": self.selectedUser
                }).$promise
                .then(function() {
                    console.log("修改用户 SUCCESS!");
                    // console.log(data);
                    self.getUsers();
                    dataManager.addNotification("success", "用户" + self.selectedUser.id + "修改成功");
                });
        };
        self.removeUser = function(id) {
            // console.log({ id: id });
            dataManager.users.delete({ id: id }).$promise
                .then(function() {
                    console.log("删除用户 SUCCESS!");
                    // console.log(data);
                    dataManager.addNotification("success", "用户" + id + "删除成功");
                    self.getUsers();
                });
        };
    }]);
