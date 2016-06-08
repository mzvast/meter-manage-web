'use strict';

/**
 * @ngdoc function
 * @name manageApp.controller:ActionProductRegisterCtrl
 * @description
 * # ActionProductRegisterCtrl
 * Controller of the manageApp
 */
angular.module('manageApp')
  .controller('ActionProductRegisterCtrl', ["uiManager", "formManager", function (uiManager, formManager) {
    var self = this;
    self.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    /*配置页面基本元数据*/
    uiManager.pageMetaDateConstructor("备案软件","登记",self);
    ////////////
    // 标签数据模型 //
    ////////////
    self.tabs = self.options = [
      {
        id: 0,
        name: "软件备案申请表",
        fid:"apply"
      },
      {
        id: 1,
        name: "供应商信息登记表",
        fid:"supplier"
      },
      {
        id: 2,
        name: "试验委托协议",
        fid:"contract"
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