'use strict';

/**
 * @ngdoc function
 * @name manageApp.controller:ActionTestCtrl
 * @description
 * # ActionTestCtrl
 * Controller of the manageApp
 */
angular.module('manageApp')
  .controller('ActionTestCtrl', ["uiManager", "formManager", function (uiManager, formManager) {
    var self = this;
    self.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    /*配置页面基本元数据*/
    uiManager.pageMetaDateConstructor("测试备案加密","",self);
    ////////////
    // 标签数据模型 //
    ////////////
    self.tabs = self.options = [
      {
        id: 0,
        name: "申请表",
        state:"action-test.form"
      },
      {
        id: 1,
        name: "测试执行",
        state:"action-test.run"
      },
      {
        id: 2,
        name: "软件上传加密",
        state:"action-test.encrypt"
      },
      {
        id: 3,
        name: "备案状态",
        state:"action-test.status"
      }
    ];
    self.setTab = function (value) {
      self.type = value ? value : -1;
      // self.get();
    };

    self.onSubmit = onSubmit;

    self.model = {
      createDate: Date.now()
    };

    self.fields = formManager.getForm("apply", self);

    // function definition
    function onSubmit() {
      alert(JSON.stringify(self.model), null, 2);
    }
  }]);
