'use strict';

/**
 * @ngdoc function
 * @name manageApp.controller:ActionBeianProductCtrl
 * @description
 * # ActionBeianProductCtrl
 * Controller of the manageApp
 */
angular.module('manageApp')
  .controller('ActionBeianProductCtrl', ['$state','dataManager', 'uiManager','beianManager', function ($state,_dataManager, _uiManager,_beianManager) {
    var vm = this;
    vm.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    /////////////////////////
    // 页面基础设施初始化 //
    ////////////////////////
    _uiManager.pageInit("产品", "选择", vm);
    //////////////////
    // 列表数据模型 //
    /////////////////
    vm.model = {
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
    vm.tabs = vm.options = [{
      id: 0,
      name: "未备案"
    }, {
      id: 1,
      name: "已备案"
    }];

    //////////////
    // form数据模型 //
    //////////////
    vm.formModel = {
      name: "名称",
      batch: "批次",
      supplier: "供应商",
      describe: "描述"
    };

    /////////////
    // 资源连接 //
    /////////////
    var _C = _dataManager.C('products', vm),
        _R = _dataManager.R('products', vm);


    ///////////
    // 弹窗Modal //
    ///////////
    vm.setModal = function (item) {
      if (item === undefined) {
        vm.form = {};
        vm.selectedOption = vm.options[0];
        vm.modalType = 0;
        vm.modalTitle = "新增" + vm.pageResourceName;
      } else {
        vm.form = item;
        log(item.type);
        vm.selectedOption = vm.options[item.type];
        vm.modalType = 1;
        vm.modalTitle = "修改" + vm.pageResourceName;
      }
      // console.log(vm.selectedItem);
    };
    ///////////////////
    // 保存时候区分是新建还是修改 //
    ///////////////////
    vm.save = function () {
      switch (vm.modalType) {
        case 0:
          vm.create();
          break;
        case 1:
          vm.update();
          break;
        default:
          return;
      }
    };
    vm.get = function () {
      var queryObj = {
        current_page: vm.currentPage,
        items_per_page: vm.itemsPerPage,
        order_by: vm.predicate,
        q: vm.q,
        reverse: vm.reverse,
        type: 0//vm.type
      };
      _R(queryObj);
    };
    vm.get(); //页面第一次加载
    vm.create = function () {
      vm.form.type = vm.selectedOption.id;
      _C(vm.form);
    };

    vm.setProduct = function (item) {
      if(_beianManager.setProduct(item)){
        $state.go("action-beian.setInfo")
      }else{
        _dataManager.addNotification("danger","设置失败！");
      }
    };
  }]);
