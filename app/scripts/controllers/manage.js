'use strict';

/**
 * @ngdoc function
 * @name manageApp.controller:ManageCtrl
 * @description
 * # ManageCtrl
 * Controller of the manageApp
 */
angular.module('manageApp')
  .controller('ManageCtrl', ['$stateParams','dataManager',function ($stateParams,_dataManager) {
    var vm = this;
    vm.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    vm.category = $stateParams.category||'products';
    vm.canEdit = $stateParams.canEdit;
    vm.pageResourceName = _dataManager.getResourceName(vm.category);
    vm.pageType = '管理';
    vm.pageTitle = vm.pageResourceName + vm.pageType;

    _dataManager.pageInit(vm.pageResourceName,vm.pageType,vm);
    //////////////////
    // 列表数据模型 //
    /////////////////
    vm.model = _dataManager.getModelByName(vm.category);
    vm.formModelFrozen = _dataManager.getFrozenFormModelByName(vm.category);
    ////////////
    // 标签数据模型 //
    ////////////
    vm.tabs = vm.options = _dataManager.getTabByName(vm.category);

    //////////////
    // form数据模型 //
    //////////////
    vm.formModel = _dataManager.getFormModelByName(vm.category);

    /////////////
    // 资源连接 //
    /////////////
    var _C = _dataManager.C(vm.category, vm),
      _R = _dataManager.R(vm.category, vm),
      _U = _dataManager.U(vm.category, vm),
      _D = _dataManager.D(vm.category, vm);



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
        vm.selectedOption = vm.options[item.type];
        vm.modalType = 1;
        vm.modalTitle = "修改" + vm.pageResourceName;
      }
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
        type: vm.type
      };
      _R(queryObj);
    };
    vm.get(); //页面第一次加载
    vm.create = function () {
      vm.form.type = vm.selectedOption.id;
      _C(vm.form);

    };

    vm.update = function () {
      vm.form.type = vm.selectedOption.id;
      _U(vm.form);
    };
    vm.remove = function (id) {
      _D(id);
    };

  }]);
