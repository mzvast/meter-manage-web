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
    uiManager.pageMetaDateConstructor("备案比对","",self);
    ////////////
    // 标签数据模型 //
    ////////////

    var rawTabs = [
      {
        name:"产品选择",
        state:""
      },
      {
        name: "信息录入",
        state:"action-test.form"
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
        state:"action-test.compare"
      },
      {
        name: "加密上传",
        state:"action-test.encrypt"
      },
      {
        name: "比对报告",
        state:"action-test.status"
      }
    ];

    var addIdToRawTabs =function () {
      var i;
      for(i=0;i<rawTabs.length;i++){
        rawTabs[i]['id']=i;
      }
    }();
    self.tabs = rawTabs;
    

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
