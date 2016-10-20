'use strict';

/**
 * @ngdoc service
 * @name manageApp.formModelService
 * @description
 * # formModelService
 * Service in the manageApp.
 */
angular.module('manageApp')
  .service('formModelService', formModelService);


formModelService.$inject = [];

function formModelService() {
  // AngularJS will instantiate a singleton by calling "new" on this function
  var self = this;
  self.get = function (name) {
    switch (name) {
      case 'products':
        return {
          name: "名称",
          model: "型号",
          batch: "批次",
          description: "描述"
        };
      case 'users':
        return {
          name: "名称",
          age: "年龄",
          skill: "技能",
          exp: "经验"
        };
      case 'requirements':
        return {
          title: "名称",
          describe: "描述"
        };
      case 'vendors':
        return {
          name: "厂家名称",
          code: "厂家代码"
        };
      case 'cases':
        return {
          title: "名称",
          describe: "描述",
          pre_condition: "前置条件",
          expout: "期望结果"
        };
      case 'plans':
        return {
          title: "名称"//,
          // describe: "描述"
        };
      case 'envs':
        return {
          title: "名称",
          describe: "描述"
        };
      case 'flaws':
        return {
          title: "名称"
        };
    }

  };
  self.getFrozen = function (name) {
    switch (name) {
      case 'flaws':
        return {
          productID: "产品ID",
          planID: "测试计划ID"
        };
      default:
        return;
    }
  };
}
