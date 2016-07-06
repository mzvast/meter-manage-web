'use strict';

/**
 * @ngdoc function
 * @name manageApp.controller:ActionBeianCtrl
 * @description
 * # ActionBeianCtrl
 * Controller of the manageApp
 */
angular.module('manageApp')
  .controller('ActionBeianCtrl', ["uiManager", "formManager","beianManager","$state", function (_uiManager, _formManager,_beianManager,$state) {
    var vm = this;
    vm.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    /*配置页面基本元数据*/
    _uiManager.pageMetaDateConstructor("备案比对","",vm);
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
        state:"action-beian.arg"
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
    vm.tabs = tabs;

    //获取form
    vm.fields = _formManager.getForm("apply", vm);
  }]);
