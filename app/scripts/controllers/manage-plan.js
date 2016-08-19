'use strict';

/**
 * @ngdoc function
 * @name manageApp.controller:ManagePlanCtrl
 * @description
 * # ManagePlanCtrl
 * Controller of the manageApp
 */
angular.module('manageApp')
  .controller('ManagePlanCtrl', ['$state','$stateParams', 'dataManager',function ($state,$stateParams, _dataManager) {
    var vm = this;
    vm.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    ////////////
    // 新增测试计划 //
    ////////////
    ['onProducts', 'onRequirements', 'onEnvs', 'onUsers']
      .map(function (elem) {
        return vm[elem] = false;
      });

    vm.setTopTab = function (value) {
      ['onProducts', 'onRequirements', 'onEnvs', 'onUsers']
        .map(function (elem) {
          return vm[elem] = (value === elem);
        })
    };


    vm.productsList = [];
    vm.addToProductsList = function (item) {
      if (itemNotInList(item, vm.productsList)) {
        vm.productsList.push(item);
      }
    };
    vm.requirementsList = [];
    vm.addToRequirementsList = function (item) {
      if (itemNotInList(item, vm.requirementsList)) {
        vm.requirementsList.push(item);
      }

    };
    vm.envsList = [];
    vm.addToEnvsList = function (item) {
      if (itemNotInList(item, vm.envsList)) {
        vm.envsList.push(item);
      }

    };
    vm.usersList = [];
    vm.addToUsersList = function (item) {
      if (itemNotInList(item, vm.usersList)) {
        vm.usersList.push(item);
      }
    };

    var removeItemFromList = function (item, list) {
      var itemID = -1;
      list.map(function (elem, index) {
        if (elem.id === item.id) {
          itemID = index;
        }
      });
      list.splice(itemID, 1);
    };

    vm.removeFromProductsList = function (item) {
      removeItemFromList(item, vm.productsList);
    };
    vm.removeFromRequirementsList = function (item) {
      removeItemFromList(item, vm.requirementsList);
    };
    vm.removeFromEnvsList = function (item) {
      removeItemFromList(item, vm.envsList);
    };
    vm.removeFromUsersList = function (item) {
      removeItemFromList(item, vm.usersList);
    };
    // 操作按钮样式
    var itemNotInList = function (item, list) {
      var valid = true;
      list.map(function (elem) {
        if (elem.id === item.id) {
          valid = false;

        }
      });
      return valid;
    };

    vm.itemNotInProductsList = function (item) {
      return itemNotInList(item, vm.productsList)
    };

    vm.itemNotInRequirementsList = function (item) {
      return itemNotInList(item, vm.requirementsList)
    };
    vm.itemNotInEnvsList = function (item) {
      return itemNotInList(item, vm.envsList)
    };
    vm.itemNotInUsersList = function (item) {
      return itemNotInList(item, vm.usersList)
    };
    /////////////////////////
    // 页面基础设施初始化 //
    ////////////////////////
    vm.category = 'plans';
    vm.pageResourceName = _dataManager.getResourceName(vm.category);
    vm.pageType = '管理';
    vm.pageTitle = vm.pageResourceName + vm.pageType;

    _dataManager.pageInit(vm.pageResourceName,vm.pageType,vm);

    //////////////////
    // 列表数据模型 //
    /////////////////
    vm.model = _dataManager.getModelByName('plans');
    ////////////
    // 标签数据模型 //
    ////////////
    vm.tabs = vm.options = _dataManager.getTabByName('plans');

    //////////////
    // form数据模型 //
    //////////////
    vm.formModel = _dataManager.getFormModelByName('plans');

    ///////////
    // 弹窗Modal //
    ///////////
    vm.setModal = function (item) {
      if (item === undefined) {
        // vm.form = {};
        ['productsList', 'requirementsList', 'envsList', 'usersList'].map(function (elem) {
          vm[elem] = [];
        });
        vm.modalType = 0;
        vm.modalTitle = "新增" + vm.pageResourceName;

      } else {
        // vm.form = item;
        ['productsList', 'requirementsList', 'envsList', 'usersList'].map(function (elem) {
          vm[elem] = item[elem];
        });
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
      _dataManager.ReadListByQuery(vm.category,queryObj,function (response) {
        vm.itemList = response.data;
        vm.totalItems = response.total_items;
      });
    };
    vm.get(); //页面第一次加载


    vm.create = function () {
      var form = {};
      form.productsList = vm.productsList;
      form.requirementsList = vm.requirementsList;
      form.envsList = vm.envsList;
      form.usersList = vm.usersList;
      _dataManager.CreateOne(vm.category,form,function (response) {
        _dataManager.addNotification("success", "新" + vm.pageResourceName + "创建成功");
        // vm.get();
        $state.go('manage-plan');
      });
    };

    vm.reset = function () {
      ['productsList', 'requirementsList', 'envsList', 'usersList'].map(function (elem) {
        vm[elem] = [];
      })
    };

    vm.update = function () {
      var form = {};
      form.productsList = vm.productsList;
      form.requirementsList = vm.requirementsList;
      form.envsList = vm.envsList;
      form.usersList = vm.usersList;

      _dataManager.UpdateOneByID(vm.category,vm.form,function (response) {
        _dataManager.addNotification("success", vm.pageResourceName + form.id + "修改成功");
        $state.go('manage-plan');
      });
    };
    vm.remove = function (id) {
      _dataManager.DeleteOneByID(vm.category, id,function (response) {
        _dataManager.addNotification("success", vm.pageResourceName + id + "删除成功");
      });
    };
  }]);
