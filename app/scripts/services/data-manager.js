'use strict';

/**
 * @ngdoc service
 * @name manageApp.dataManager
 * @description
 * # dataManager
 * Service in the manageApp.
 */
angular.module('manageApp')
  .service('dataManager', ['$http', '$resource', function ($http, $resource) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var self = this;

    self.pdfMake = function (docDef) {
      return $http.post("/node/pdf", docDef, {responseType: 'arraybuffer'});
    };

    //////////////////
    //notifications //
    //////////////////
    self.notifications = [];
    self.addNotification = function (type, message) {
      self.notifications.push({"type": type, "message": message});
    };
    self.getNotifications = function () {
      return self.notifications;
    };
    self.removeNotification = function (index) {
      self.notifications.splice(index, 1);
    };

    //////////////////////////
    // Resource 构造函数 //
    //////////////////////////
    [
      'products',
      'users',
      'requirements',
      'envs',
      'plans',
      'flaws'
    ].map(function (elem) {
      var url = '/api/v2/' + elem + '/:id';
      self[elem] = $resource(url, {
        id: '@id'
      }, {
        update: {
          method: 'PUT'
        }
      });
    });

    //////////////
    // CRUD构造函数 //
    //////////////
    self.R = function (resourceName, vm) {
      return function (queryObj) {
        // console.log(queryObj);
        self[resourceName].get(queryObj).$promise
          .then(function (response) {
            console.log("获取" + vm.pageResourceName + " SUCCESS!");

            // console.dir(response);
            // console.dir(response.json);
            vm.itemList = response.json;
            vm.totalItems = response.total_items;
          });
      };
    };
    self.C = function (resourceName, vm) {
      return function (formObj) {
        console.log("formObj=");
        console.log(formObj);
        self[resourceName].save({"json": formObj}).$promise
          .then(function () {
            console.log("新增资源 SUCCESS!");

            // console.log(data);
            self.addNotification("success", "新" + vm.pageResourceName + "创建成功");
            vm.get();
          });
      };
    };
    self.U = function (resourceName, vm) {
      return function (formObj) {
        console.log("formObj=");
        console.log(formObj);
        self[resourceName].update({
          id: formObj.id
        }, {"json": formObj}).$promise
          .then(function () {
            console.log("修改资源 SUCCESS!");

            // console.log(data);
            self.addNotification("success", vm.pageResourceName + formObj.id + "修改成功");
            vm.get();
          });
      };
    };
    self.D = function (resourceName, vm) {
      return function (id) {
        console.log("id=" + id);
        self[resourceName].delete({
          id: id
        }).$promise
          .then(function () {
            console.log("删除资源 SUCCESS!");

            // console.log(data);
            self.addNotification("success", vm.pageResourceName + id + "删除成功");
            vm.get();
          });
      };
    };

    self.getModelByName = function (name) {
      switch (name) {
        case 'product': {
          return {
            id: "ID",
            name: "名称",
            batch: "批次",
            supplier: "供应商",
            describe: "描述",
            create_date: "创建时间"
          };
        }
        case 'user':
          return {
            id: "ID",
            name: "名称",
            age: "年龄",
            skill: "技能",
            exp: "经验",
            create_date: "创建时间"
          };
        case 'req':
          return {
            id: "ID",
            title: "名称",
            describe: "描述",
            create_date: "创建时间"
          };
        case 'plan':
          return {
            id: "ID",
            title: "名称",
            creator: "制定者",
            create_date: "创建时间"
          };
        case 'env':
          return {
            id: "ID",
            title: "名称",
            describe: "描述",
            create_date: "创建时间"
          };
        case 'flaw':
          return {
            id: "ID",
            title: "名称",
            productName: "产品名称",
            supplier: "供应商",
            productID: "产品ID",
            planID: "测试计划ID",
            // type:"状态",
            create_date: "创建时间"
          };
      }
    };

    self.getTabByName = function (name) {
      switch (name) {
        case 'product':
          return [{
            id: 0,
            name: "未备案"
          }, {
            id: 1,
            name: "已备案"
          }];
        case 'user':
          return [{
            id: 0,
            name: "超级管理员"
          }, {
            id: 1,
            name: "管理员"
          }, {
            id: 2,
            name: "测试员"
          }];
        case 'req':
          return [{
            id: 0,
            name: "单元测试"
          }, {
            id: 1,
            name: "集成测试"
          }, {
            id: 2,
            name: "功能测试"
          }, {
            id: 3,
            name: "性能测试"
          }];
        case 'plan':
          return [{
            id: 0,
            name: "未完成"
          }, {
            id: 1,
            name: "已完成"
          }];
        case 'env':
          return [{
            id: 0,
            name: "软件环境"
          }, {
            id: 1,
            name: "硬件环境"
          }];
        case 'flaw':
          return [{
            id: 0,
            name: "提交"
          }, {
            id: 1,
            name: "确认"
          }, {
            id: 2,
            name: "修复"
          }, {
            id: 3,
            name: "重开"
          }, {
            id: 4,
            name: "关闭"
          }];
      }
    }

    self.getFormModelByName = function (name) {
      switch (name) {
        case 'product':
          return {
            name: "名称",
            batch: "批次",
            supplier: "供应商",
            describe: "描述"
          };
        case 'user':
          return {
            name: "名称",
            age:"年龄",
            skill:"技能",
            exp:"经验"
          };
        case 'req':
          return {
            title: "名称",
            describe: "描述"
          };
        case 'plan':
          return {
            title: "名称",
            describe: "描述"
          };
        case 'env':
          return {
            name: "名称",
            age:"年龄",
            skill:"技能",
            exp:"经验"
          };
        case 'flaw':
          return {
            title: "名称"
          };
      }

    }

  }]);
