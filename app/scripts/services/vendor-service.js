'use strict';

/**
 * @ngdoc service
 * @name manageApp.vendorService
 * @description
 * # vendorService
 * Service in the manageApp.
 */
angular.module('manageApp')
  .service('vendorService', vendorService);

vendorService.$inject = ['$resource'];

function vendorService($resource) {
  // AngularJS will instantiate a singleton by calling "new" on this function
  var self = this;
  var url = '/api/v2/' + 'vendors' + '/:id';
  var resource = $resource(url, {
    id: '@id'
  }, {
    update: {
      method: 'PUT'
    }
  });
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
}
