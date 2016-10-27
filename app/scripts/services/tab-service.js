'use strict';

/**
 * @ngdoc service
 * @name manageApp.tabService
 * @description
 * # tabService
 * Service in the manageApp.
 */
angular.module('manageApp')
  .service('tabService', tabService);

tabService.$inject = [];

function tabService() {
  // AngularJS will instantiate a singleton by calling "new" on this function
  var self = this;
  self.get = function (name) {
    switch (name) {
      case 'products':
        return [{
          id: -1,
          name:"全部"
        },{
          id: 0,
          name: "未备案"
        }, {
          id: 1,
          name: "已备案"
        }];
      case 'users':
        return [{
          id: -1,
          name:"全部"
        },{
          id: 0,
          name: "超级管理员"
        }, {
          id: 1,
          name: "管理员"
        }, {
          id: 2,
          name: "测试员"
        }];
      case 'requirements':
        return [{
          id: -1,
          name:"全部"
        },{
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
      case 'vendors':
        return [{
          id:-1,
          name:"全部"
        }];
      case 'results':
        return [{
          id: -1,
          name:"全部"
        },{
          id: 0,
          name: "失败"
        }, {
          id: 1,
          name: "成功"
        }];
      case 'cases':
        return [{
          id: -1,
          name:"全部"
        },{
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
      case 'plans':
        return [{
          id: -1,
          name:"全部"
        },{
          id: 0,
          name: "未完成"
        }, {
          id: 1,
          name: "已完成"
        }];
      case 'envs':
        return [{
          id: -1,
          name:"全部"
        },{
          id: 0,
          name: "软件环境"
        }, {
          id: 1,
          name: "硬件环境"
        }];
      case 'flaws':
        return [{
          id: -1,
          name:"全部"
        },{
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
      case 'compare':{
        return  [
          {
            id:0,
            name: "产品选择",
          },
          {
            id:1,
            name: "信息录入",
          },
          {
            id:2,
            name: "参数配置",
          },
          {
            id:3,
            name: "暂存HEX文件",
          },
          {
            id:4,
            name: "比对信息验核",
          }
        ];
      }
    }
  };
}
