'use strict';

/**
 * @ngdoc function
 * @name manageApp.controller:ManageUserCtrl
 * @description
 * # ManageUserCtrl
 * Controller of the manageApp
 */
angular.module('manageApp')
  .controller('ManageUserCtrl', ['dataManager',function (dataManager) {
  	var self = this;
	self.awesomeThings = [
	'HTML5 Boilerplate',
	'AngularJS',
	'Karma'
	];
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
		self.getUsers();
	};
	self.getUsers = function() {
		dataManager
			.getUsers(self.itemsPerPage,self.currentPage)
			.then(function(response) {
		      		if (response.status===200) {
		      			// console.log("getting SUCCESS!");
		      			// console.log(data);
		      			self.users = response.data.users;
		      			self.totalItems = response.data.total_items;
		      		} else {
		      			console.log("can't get users data");
		      		}
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
	dataManager
		.createUser(self.newUser)
		.then(function(response) {
      		if (response.status===200) {
      			console.log("新增用户 SUCCESS!");
      			// console.log(data);
	      		dataManager.addNotification("success","新用户创建成功");
      			self.getUsers();
      		} else {
      			console.log("新增用户 fail");
      		}
      	});
	};
	self.updateUser = function() {
		dataManager
			.updateUser(self.selectedUser,self.selectedUser.id)
			.then(function(response) {
	      		if (response.status===200) {
	      			console.log("修改用户 SUCCESS!");
	      			// console.log(data);
	      			self.getUsers();
	      			dataManager.addNotification("success","用户"+self.selectedUser.id+"修改成功");
	      		} else {
	      			console.log("修改用户 fail");
	      		}
	      	});
	};
	self.removeUser = function(id) {
		dataManager
			.removeUser(id)
			.then(function(response) {
	      		if (response.status===200) {
	      			console.log("删除用户 SUCCESS!");
	      			// console.log(data);
	      			dataManager.addNotification("success","用户"+id+"删除成功");
	      			self.getUsers();
	      		} else {
	      			console.log("删除用户 fail");
	      		}
	      	});
	};
    }]);
