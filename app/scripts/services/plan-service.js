'use strict';

/**
 * @ngdoc service
 * @name manageApp.planService
 * @description
 * # planService
 * Service in the manageApp.
 */
angular.module('manageApp')
  .service('planService', planService);

planService.$inject = ['resourceCenter'];

function planService(resourceCenter) {
  // AngularJS will instantiate a singleton by calling "new" on this function
  var self = this;
  var resource = resourceCenter.get('plans');

  self.getList = function (queryObj, cb) {
    console.log(queryObj);
    resource.get(queryObj).$promise
      .then(function (response) {
        // console.log("获取" + vm.pageResourceName + " SUCCESS!");
        if (typeof cb === 'function') {
          cb(response);
        }
      });
  };

  self.add = function (formObj, cb) {
    // formObj.creator = {id:1};
    formObj.executor = formObj.executor[0];
    delete formObj.type;
    console.log("formObj=");
    console.log(formObj);
    resource.save(formObj).$promise
      .then(function (response) {
        console.log("新增资源 SUCCESS!");
        // console.log(data);
        // self.addNotification("success", "新" + vm.pageResourceName + "创建成功");
        // vm.get();
        if (typeof cb === 'function') {
          cb(response);
        }
      });
  };

  self.remove = function (id, cb) {
    console.log("id=" + id);
    resource.delete({
      id: id
    }).$promise
      .then(function (response) {
        console.log("删除资源 SUCCESS!");
        // console.log(data);
        if (typeof cb === 'function') {
          cb(response);
        }
        // vm.get();
      });
  };

  self.update = function (formObj, id, cb) {
    console.log("formObj=");
    console.log(formObj);
    resource.update({
      id: id
    }, formObj).$promise
      .then(function (response) {
        console.log("修改资源 SUCCESS!");
        // console.log(data);
        if (typeof cb === 'function') {
          cb(response);
        }
      });
  };

}
