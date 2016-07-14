'use strict';

/**
 * @ngdoc function
 * @name manageApp.controller:ManageFlawCtrl
 * @description
 * # ManageFlawCtrl
 * Controller of the manageApp
 */
angular.module('manageApp')
  .controller('ManageFlawCtrl', ['dataManager', 'uiManager', function(_dataManager, _uiManager) {
    var vm = this;
    vm.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    /////////////////////////
    // 页面基础设施初始化 //
    ////////////////////////
    _uiManager.pageInit("缺陷", "管理", vm);
    //////////////////
    // 列表数据模型 //
    /////////////////
    vm.model = _dataManager.getModelByName('flaws');

    vm.tabs =vm.options = _dataManager.getTabByName('flaws');



    //////////////
    // form数据模型 //
    //////////////
    vm.formModel = _dataManager.getFormModelByName('flaws');
    vm.formModelFrozen = {
      productID: "产品ID",
      planID: "测试计划ID"
    };

    /////////////
    // 资源连接 //
    /////////////
    var _C = _dataManager.C('flaws', vm),
        _R = _dataManager.R('flaws', vm),
        _U = _dataManager.U('flaws', vm),
        _D = _dataManager.D('flaws', vm);

    ///////////
    // 弹窗Modal //
    ///////////
    vm.setModal = function(item) {
      if (item === undefined) {
        vm.form = {};
        vm.modalType = 0;
        vm.modalTitle = "新增" + vm.pageResourceName;
      } else {
        vm.form = item;
        vm.selectedOption = vm.options[item.type];//用type值设置selectedOption
        vm.modalType = 1;
        vm.modalTitle = "修改" + vm.pageResourceName;
      }
    };
    ///////////////////
    // 保存时候区分是新建还是修改 //
    ///////////////////
    vm.save = function() {
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
    vm.get = function() {
      var queryObj = {
        current_page: vm.currentPage,
        items_per_page: vm.itemsPerPage,
        order_by: vm.predicate,
        q: vm.q,
        reverse: vm.reverse,
        type: vm.type
      };
      _R(queryObj);
    };
    vm.get(); //页面第一次加载
    vm.create = function() {
     _C(vm.form);
    };

    //快速设定状态
    vm.updateType = function (item,typeVal) {
      vm.setModal(item);
      vm.form.type = typeVal;
      _U(vm.form);
    };
    vm.update = function() {
      vm.form.type = vm.selectedOption.id;//将选中对象转换回去
      _U(vm.form);
    };
    vm.remove = function(id) {
      _D(id);
    };
  }]);
