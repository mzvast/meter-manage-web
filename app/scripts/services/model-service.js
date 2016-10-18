'use strict';

/**
 * @ngdoc service
 * @name manageApp.modelService
 * @description
 * # modelService
 * Service in the manageApp.
 */
angular.module('manageApp')
  .service('modelService', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var self = this;
    self.get = function (name) {
      switch (name) {
        case 'products':
        {
          return {
            id: "ID",
            name: "名称",
            model: "型号",
            batch: "批次",
            description: "描述",
            vendor: "厂家名称",
            vendor_code: "厂家代码",
            create_date: "创建时间"
          };
        }
        case 'users':
          return {
            id: "ID",
            name: "名称",
            age: "年龄",
            skill: "技能",
            exp: "经验",
            create_date: "创建时间"
          };
        case 'requirements':
          return {
            id: "ID",
            title: "名称",
            describe: "描述",
            create_date: "创建时间"
          };
        case 'vendors':
          return {
            id: "ID",
            name: "厂家名称",
            code: "厂家代码"
          };
        case 'results':
          return {
            id: "ID",
            plan_name: "计划名称",
            product_name: "产品名称",
            vendor_name: "厂家",
            create_date: "测试时间"
            // result_name:"结果"
          };
        case 'cases':
          return {
            id: "ID",
            title: "名称",
            describe: "描述"//,
            // env:"适用环境",
            // req:"适用需求"
            // create_date: "创建时间"
          };
        case 'plans':
          return {
            id: "ID",
            title: "名称",
            creator: "制定者",
            create_date: "创建时间"
          };
        case 'envs':
          return {
            id: "ID",
            title: "名称",
            describe: "描述",
            create_date: "创建时间"
          };
        case 'flaws':
          return {
            id: "ID",
            title: "名称",
            productName: "产品名称",
            vendor: "供应商",
            productID: "产品ID",
            planID: "测试计划ID",
            // type:"状态",
            create_date: "创建时间"
          };
      }
    };
  });
