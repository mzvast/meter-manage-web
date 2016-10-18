'use strict';

/**
 * @ngdoc function
 * @name manageApp.controller:ActionBeianCtrl
 * @description
 * # ActionBeianCtrl
 * Controller of the manageApp
 */
angular.module('manageApp')
  .controller('ActionBeianCtrl', ActionBeianCtrl);

ActionBeianCtrl.$inject = ["formManager", "beianManager", "$state", "$stateParams", "dataManager"];
function ActionBeianCtrl(_formManager, _beianManager, $state, $stateParams, _dataManager) {
  var vm = this;
  vm.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];

  localStorage.clear();//每次切换模式后清除本地数据存储

  var urlMode = $stateParams.mode,
    mode,//0,1,2
    tabs,
    title;//页面标题
  console.log(urlMode);
  switch (urlMode) {
    case 'debug': {
      _beianManager.setMode(0);
      title = '开发者模式';
      break;
    }
    case 'beian': {
      _beianManager.setMode(1);
      title = '备案比对';
      break;
    }
    case 'gonghuo': {
      _beianManager.setMode(2);
      title = '供货比对';
    }
  }

  mode = _beianManager.getMode();

  /**
   * 标题配置
   */
  vm.pageTitle = title;

  ////////////
  // 标签数据模型 //
  ////////////
  var setTabByMode = function () {
    tabs = [

      {
        name: "产品选择",
        state: "action-beian.setProduct"
      },
      {
        name: "信息录入",
        state: "action-beian.setInfo"
      },
      {
        name: "参数配置",
        state: "action-beian.setArg"
      },
      {
        name: "暂存HEX文件",
        state: "action-beian.setHex"
      },
      {
        name: "比对信息验核",
        state: "action-beian.compare"
      }
    ];

    if (mode === 0) {
      tabs.push({
        name: "比对报告",
        state: "action-beian.report"
      })
    }
  }();


  vm.tabs = tabs;

  //获取form
  vm.fields = _formManager.getForm("apply", vm);
}
