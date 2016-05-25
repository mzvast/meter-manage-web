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
                    self.products = response.products;
                    self.totalItems = response.total_items;
                });

        };

        self.getProducts();

        self.setModal = function(product) {
            self.selectedProduct = product;
            // console.log(self.selectedProduct);
        };
        self.setNewModal = function() {
            self.newProduct = null;
        };
        self.createProduct = function() {
            dataManager.products.save({ "data": "data" }).$promise
                .then(function() {
                    console.log("新增产品 SUCCESS!");
                    // console.log(data);
                    dataManager.addNotification("success", "新产品创建成功");
                    self.getProducts();
                });
        };
        self.updateProduct = function() {
            dataManager.products.update({
                    id: self.selectedProduct.id
                }, {
                    "data": self.selectedProduct
                }).$promise
                .then(function() {
                    console.log("修改产品 SUCCESS!");
                    // console.log(data);
                    self.getProducts();
                    dataManager.addNotification("success", "产品" + self.selectedProduct.id + "修改成功");
                });
        };
        self.removeProduct = function(id) {
            dataManager.products.delete({ id: id }).$promise
                .then(function() {
                    console.log("删除产品 SUCCESS!");
                    // console.log(data);
                    dataManager.addNotification("success", "产品" + id + "删除成功");
                    self.getProducts();
                });
        };
    }]);
