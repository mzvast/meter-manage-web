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

vendorService.$inject = ['resourceCenter'];

function vendorService(resourceCenter) {
  // AngularJS will instantiate a singleton by calling "new" on this function
  var self = this;
  var resource = resourceCenter.get('vendors');
  self.getList = function (queryObj, cb) {
    console.log(queryObj);
    resource.get(queryObj).$promise
      .then(function (response) {
        // console.log("获取" + vm.pageResourceName + " SUCCESS!");
        if (typeof cb === 'function') {
          var res = {};
          res.itemList = response.data.map(function (item) {
            if (item['create_date']) {
              item['create_date'] = moment.utc(item['create_date']).local().format('YYYY-MM-DD');
            }
            return item;
          });
          res.totalItems = response.total_items;
          res.currentPage = response.current_page;
          cb(res);
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
