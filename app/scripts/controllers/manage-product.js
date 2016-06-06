'use strict';

/**
 * @ngdoc function
 * @name manageApp.controller:ManageProductCtrl
 * @description
 * # ManageProductCtrl
 * Controller of the manageApp
 */
angular.module('manageApp')
    .controller('ManageProductCtrl', ['dataManager', 'uiManager', function(dataManager, uiManager) {
        var self = this;
        self.awesomeThings = [
          'HTML5 Boilerplate',
          'AngularJS',
          'Karma'
        ];

        /////////////////////////
        // 页面基础设施初始化 //
        ////////////////////////
        uiManager.pageInit("产品", "管理", self);
        //////////////////
        // 列表数据模型 //
        /////////////////
        self.model = {
          id: "ID",
          name: "名称",
          batch: "批次",
          supplier: "供应商",
          describe: "描述",
          create_date: "创建时间"
        };
        ////////////
        // 标签数据模型 //
        ////////////
        self.tabs = self.options = [{
          id: 0,
          name: "未备案"
        }, {
          id: 1,
          name: "已备案"
        }];
        self.setTab = function(value) {
          self.type = value ? value : -1;
          self.get();
        };
        //////////////
        // form数据模型 //
        //////////////
        self.formModel = {
          name: "名称",
          batch: "批次",
          supplier: "供应商",
          describe: "描述"
        };
        ////////////
        // 配置调试 //
        ////////////
        var log = dataManager.log();

        /////////////
        // 资源连接 //
        /////////////
        ['C', 'R', 'U', 'D'].map(function(elem) {
          self[elem] = dataManager[elem]('products', self);
        });

        ///////////
        // 弹窗Modal //
        ///////////
        self.setModal = function(item) {
          if (item === undefined) {
            self.form = {};
            self.selectedOption = self.options[0];
            self.modalType = 0;
            self.modalTitle = "新增" + self.pageResourceName;
          } else {
            self.form = item;
            log(item.type);
            self.selectedOption = self.options[item.type];
            self.modalType = 1;
            self.modalTitle = "修改" + self.pageResourceName;
          }
          // console.log(self.selectedItem);
        };
        ///////////////////
        // 保存时候区分是新建还是修改 //
        ///////////////////
        self.save = function() {
          switch (self.modalType) {
            case 0:
              self.create();
              break;
            case 1:
              self.update();
              break;
            default:
              return;
          }
        };
        self.get = function() {
          var queryObj = {
            current_page: self.currentPage,
            items_per_page: self.itemsPerPage,
            order_by: self.predicate,
            q: self.q,
            reverse: self.reverse,
            type: self.type || -1
          };
          self.R(queryObj);
        };
        self.get(); //页面第一次加载
        self.create = function() {
          self.form.type = self.selectedOption.id;
          self.C(self.form);
        };

        self.update = function() {
          self.form.type = self.selectedOption.id;
          self.U(self.form);
        };
        self.remove = function(id) {
          self.D(id);
        };
      }]
    );
