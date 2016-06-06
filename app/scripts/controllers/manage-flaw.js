'use strict';

/**
 * @ngdoc function
 * @name manageApp.controller:ManageFlawCtrl
 * @description
 * # ManageFlawCtrl
 * Controller of the manageApp
 */
angular.module('manageApp')
  .controller('ManageFlawCtrl', ['dataManager', 'uiManager', function(dataManager, uiManager) {
    var self = this;
    self.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    /////////////////////////
    // 页面基础设施初始化 //
    ////////////////////////
    uiManager.pageInit("缺陷", "管理", self);
    //////////////////
    // 列表数据模型 //
    /////////////////
    self.model = {
      id: "ID",
      title: "名称",
      productName:"产品名称",
      supplier:"供应商",
      productID: "产品ID",
      planID: "测试计划ID",
      // type:"状态",
      create_date: "创建时间"
    };

    self.tabs =self.options = [{
        id: 0,
        name:"提交"
      },{
        id:1,
        name:"确认"
      },{
        id:2,
        name:"修复"
      },{
        id:3,
        name:"重开"
      },{
        id:4,
        name:"关闭"
      }];


    self.setTab = function(value) {
      self.type = value ? value : -1;
      self.get();
    };
    //////////////
    // form数据模型 //
    //////////////
    self.formModel = {
      title: "名称"
    };
    self.formModelFrozen = {
      productID: "产品ID",
      planID: "测试计划ID"
    };
    ////////////
    // 配置调试 //
    ////////////
    var log = dataManager.log();

    /////////////
    // 资源连接 //
    /////////////
    ['C', 'R', 'U', 'D'].map(function(elem) {
      self[elem] = dataManager[elem]('flaws', self);
    });

    ///////////
    // 弹窗Modal //
    ///////////
    self.setModal = function(item) {
      if (item === undefined) {
        self.form = {};
        self.modalType = 0;
        self.modalTitle = "新增" + self.pageResourceName;
      } else {
        self.form = item;
        self.selectedOption = self.options[item.type];//用type值设置selectedOption
        // log(self.options[item.type]);
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
        type: self.type||-1
      };
      self.R(queryObj);
    };
    self.get(); //页面第一次加载
    self.create = function() {
      self.C(self.form);
    };

    //快速设定状态
    self.updateType = function (item,typeVal) {
      self.setModal(item);
      self.form.type = typeVal;
      // log(self.form);
      self.U(self.form);
    };
    self.update = function() {
      self.form.type = self.selectedOption.id;//将选中对象转换回去
      // log(self.form);
      self.U(self.form);
    };
    self.remove = function(id) {
      self.D(id);
    };
  }]);
