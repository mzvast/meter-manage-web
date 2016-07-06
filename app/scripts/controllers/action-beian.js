'use strict';

/**
 * @ngdoc function
 * @name manageApp.controller:ActionBeianCtrl
 * @description
 * # ActionBeianCtrl
 * Controller of the manageApp
 */
angular.module('manageApp')
  .controller('ActionBeianCtrl', ["uiManager", "formManager", function (uiManager, formManager) {
    var self = this;
    self.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    /*配置页面基本元数据*/
    uiManager.pageMetaDateConstructor("备案比对","",self);
    ////////////
    // 标签数据模型 //
    ////////////

    var tabs = [
      {
        name:"产品选择",
        state:"action-beian.selectProduct"
      },
      {
        name: "信息录入",
        state:"action-beian.info"
      },
      {
        name:"参数配置",
        state:""
      },
      {
        name:"上传hex文件",
        state:""
      },
      {
        name:"开始比对",
        state:"action-beian.compare"
      },
      {
        name: "加密上传",
        state:"action-beian.encrypt"
      },
      {
        name: "比对报告",
        state:"action-beian.status"
      }
    ];

    var addIdToTabs =function () {
      var i;
      for(i=0;i<tabs.length;i++){
        tabs[i]['id'] = i;
      }

    }();
    self.tabs = tabs;


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
