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
	
	self.getProducts = function() {
		dataManager.getProducts().success(function(data, status, headers, config) {
		      		if (status===200) {
		      			// console.log("getting SUCCESS!");
		      			// console.log(data);
		      			self.products = data.products;
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
	dataManager.createProduct(self.newProduct).success(function(data, status, headers, config) {
      		if (status===200&&data.status==="success") {
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
		dataManager.updateProduct(self.selectedProduct,self.selectedProduct.id).success(function(data, status, headers, config) {
	      		if (status===200&&data.status==="success") {
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
		dataManager.removeProduct(id).success(function(data, status, headers, config) {
	      		if (status===200&&data.status==="success") {
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
