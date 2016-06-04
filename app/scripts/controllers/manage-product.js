'use strict';

/**
 * @ngdoc function
 * @name manageApp.controller:ManageProductCtrl
 * @description
 * # ManageProductCtrl
 * Controller of the manageApp
 */
angular.module('manageApp')
    .controller('ManageProductCtrl', ['dataManager', function(dataManager) {
        var self = this;
        self.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
        //////////
        // 列表数据模型 //
        //////////
        self.model = {
            id: "ID",
            title: "名称",
            batch: "批次",
            supplier:"供应商",
            describe:"描述",
            create_date: "创建时间"
        };
        //////////////
        // form数据模型 //
        //////////////
        self.formModel = {
            id: "ID",
            title: "名称",
            batch: "批次",
            supplier:"供应商",
            describe:"描述"
        };

        ////////////////
        // sort //
        ////////////////
        self.predicate = 'id';
        self.reverse = true;
        self.order = function(predicate) {
            self.reverse = (self.predicate === predicate) ? !self.reverse : false;
            self.predicate = predicate;
            self.getProducts();
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

        self.pageChanged = function() {
            console.log('Page changed to: ' + self.currentPage);
            self.getProducts();
        };
        /////////////
        // search //
        /////////////
        self.search = function(q) {
        	console.log("q="+q);
        	self.currentPage = 1;
            dataManager.products.get({
                    current_page: self.currentPage,
                    items_per_page: self.itemsPerPage,
                    order_by: self.predicate,
                    q:q,
                    reverse: self.reverse
                }).$promise
                .then(function(response) {
                    console.log("搜索产品 SUCCESS!");
                    // console.dir(response);
                    self.products = response.json;
                    self.totalItems = response.total_items;
                });
        };
        self.resetSearch =function() {
        	self.q = "";
        	self.currentPage = 1;
        	self.getProducts();
        };
         /////////////
        // Product //
        /////////////
        self.getProducts = function() {
            dataManager.products.get({
                    current_page: self.currentPage,
                    items_per_page: self.itemsPerPage,
                    order_by: self.predicate,
                    reverse: self.reverse
                }).$promise
                .then(function(response) {
                    console.log("获取产品 SUCCESS!");
                    // console.dir(response);
                    self.products = response.json;
                    self.totalItems = response.total_items;
                });

        };

        self.getProducts();

        self.setModal = function(product) {
            self.selectedProduct = product;
            // console.log(self.selectedProduct);
        };
        self.setNewModal = function() {
            self.newProduct = {};
        };
        self.createProduct = function() {
            // self.newProduct.create_date = (new Date()).toISOString().slice(0, 10);
            // console.log({ "json": self.newProduct });
            dataManager.products.save({ "json": self.newProduct }).$promise
                .then(function() {
                    console.log("新增产品 SUCCESS!");
                    // console.log(data);
                    dataManager.addNotification("success", "新产品创建成功");
                    self.getProducts();
                });
        };
        self.updateProduct = function() {
            // console.log({"json":self.selectedProduct});
            dataManager.products.update({
                    id: self.selectedProduct.id
                }, {
                    "json": self.selectedProduct
                }).$promise
                .then(function() {
                    console.log("修改产品 SUCCESS!");
                    // console.log(data);
                    self.getProducts();
                    dataManager.addNotification("success", "产品" + self.selectedProduct.id + "修改成功");
                });
        };
        self.removeProduct = function(id) {
            // console.log({ id: id });
            dataManager.products.delete({ id: id }).$promise
                .then(function() {
                    console.log("删除产品 SUCCESS!");
                    // console.log(data);
                    dataManager.addNotification("success", "产品" + id + "删除成功");
                    self.getProducts();
                });
        };
    }]);
