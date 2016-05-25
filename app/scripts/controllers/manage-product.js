'use strict';

/**
 * @ngdoc function
 * @name manageApp.controller:ManageProductCtrl
 * @description
 * # ManageProductCtrl
 * Controller of the manageApp
 */
angular.module('manageApp')
  .controller('ManageProductCtrl', ['dataManager',function (dataManager) {
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
	self.maxSize = 5;//显示的时候页码的最多个数，忽略该参数

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
		dataManager
			.getProducts(self.itemsPerPage,
						self.currentPage,
						self.predicate,
						self.reverse)
			.then(function(response) {
		      		if (response.status===200) {
		      			// console.log(response.data.products);
		      			// console.log("getting SUCCESS!");
		      			self.products = response.data.products;
		      			self.totalItems = response.data.total_items;
		      		} else {
		      			console.log("can't get products data");
		      		}
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
	dataManager
		.createProduct(self.newProduct)
		.then(function(response) {
      		if (response.status===200) {
      			console.log("新增产品 SUCCESS!");
      			// console.log(data);
	      		dataManager.addNotification("success","新产品创建成功");
      			self.getProducts();
      		} else {
      			console.log("新增产品 fail");
      		}
      	});
	};
	self.updateProduct = function() {
		dataManager
			.updateProduct(self.selectedProduct,self.selectedProduct.id)
			.then(function(response) {
	      		if (response.status===200) {
	      			console.log("修改产品 SUCCESS!");
	      			// console.log(data);
	      			self.getProducts();
	      			dataManager.addNotification("success","产品"+self.selectedProduct.id+"修改成功");
	      		} else {
	      			console.log("修改产品 fail");
	      		}
	      	});
	};
	self.removeProduct = function(id) {
		dataManager
			.removeProduct(id)
			.then(function(response) {
	      		if (response.status===200) {
	      			console.log("删除产品 SUCCESS!");
	      			// console.log(data);
	      			dataManager.addNotification("success","产品"+id+"删除成功");
	      			self.getProducts();
	      		} else {
	      			console.log("删除产品 fail");
	      		}
	      	});
	};
    }]);
