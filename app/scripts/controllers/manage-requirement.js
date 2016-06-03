'use strict';

/**
 * @ngdoc function
 * @name manageApp.controller:ManageRequirementCtrl
 * @description
 * # ManageRequirementCtrl
 * Controller of the manageApp
 */
angular.module('manageApp')
    .controller('ManageRequirementCtrl', ['dataManager', function(dataManager) {
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
            self.get();
        };
        ////////////////
        //Pagination  //
        ////////////////
        // self.totalItems = 100;
        self.currentPage = 1;
        self.itemsPerPage = 10;
        self.maxSize = 5; //显示的时候页码的最多个数，忽略该参数

        // self.setPage = function (pageNo) {
        //  self.currentPage = pageNo;
        // };

        self.pageChanged = function() {
            console.log('Page changed to: ' + self.currentPage);
            self.get();
        };
        /////////////
        // search //
        /////////////
        self.search = function(q) {
            console.log("q=" + q);
            self.currentPage = 1;
            dataManager.requirements.get({
                    current_page: self.currentPage,
                    items_per_page: self.itemsPerPage,
                    order_by: self.predicate,
                    q: q,
                    reverse: self.reverse
                }).$promise
                .then(function(response) {
                    console.log("搜索需求 SUCCESS!");
                    // console.dir(response);
                    self.itemList = response.json;
                    self.totalItems = response.total_items;
                });
        };
        self.resetSearch = function() {
            self.q = "";
            self.currentPage = 1;
            self.get();
        };
        /////////////
        // Requirements //
        /////////////
        self.get = function() {
            dataManager.requirements.get({
                    current_page: self.currentPage,
                    items_per_page: self.itemsPerPage,
                    order_by: self.predicate,
                    reverse: self.reverse
                }).$promise
                .then(function(response) {
                    console.log("获取需求 SUCCESS!");
                    // console.dir(response);
                    // console.dir(response.json);
                    self.itemList = response.json;
                    self.totalItems = response.total_items;
                });

        };

        self.get();

        self.setModal = function(item) {
            self.selectedItem = item;
            // console.log(self.selectedItem);
        };
        self.setNewModal = function() {
            self.new = {};
        };
        self.create = function() {
            // self.new.create_date = (new Date()).toISOString().slice(0, 10);
            // console.log({ "json": self.new });
            dataManager.requirements.save({ "json": self.new }).$promise
                .then(function() {
                    console.log("新增需求 SUCCESS!");
                    // console.log(data);
                    dataManager.addNotification("success", "新需求创建成功");
                    self.get();
                });
        };
        self.update = function() {
            // console.log({"json":self.selectedItem});
            dataManager.requirements.update({
                    id: self.selectedItem.id
                }, {
                    "json": self.selectedItem
                }).$promise
                .then(function() {
                    console.log("修改需求 SUCCESS!");
                    // console.log(data);
                    self.get();
                    dataManager.addNotification("success", "需求" + self.selectedItem.id + "修改成功");
                });
        };
        self.remove = function(id) {
            // console.log({ id: id });
            dataManager.requirements.delete({ id: id }).$promise
                .then(function() {
                    console.log("删除需求 SUCCESS!");
                    // console.log(data);
                    dataManager.addNotification("success", "需求" + id + "删除成功");
                    self.get();
                });
        };
    }]);
