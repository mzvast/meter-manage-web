'use strict';

/**
 * @ngdoc function
 * @name manageApp.controller:ManageCaseCtrl
 * @description
 * # ManageCaseCtrl
 * Controller of the manageApp
 */
angular.module('manageApp')
  .controller('ManageCaseCtrl',['$state','$stateParams', 'dataManager',function ($state,$stateParams, _dataManager) {
    var vm = this;
    vm.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    ////////////
    // 新增测试用例 //
    ////////////
    ['onRequirements', 'onEnvs']
      .map(function (elem) {
        return vm[elem] = false;
      });

    vm.setTopTab = function (value) {
      ['onRequirements', 'onEnvs']
        .map(function (elem) {
          return vm[elem] = (value === elem);
        })
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

    var removeItemFromList = function (item, list) {
      var itemID = -1;
      list.map(function (elem, index) {
        if (elem.id === item.id) {
          itemID = index;
        }
      });
      list.splice(itemID, 1);
    };


    vm.removeFromRequirementsList = function (item) {
      removeItemFromList(item, vm.requirementsList);
    };
    vm.removeFromEnvsList = function (item) {
      removeItemFromList(item, vm.envsList);
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

    vm.itemNotInRequirementsList = function (item) {
      return itemNotInList(item, vm.requirementsList)
    };
    vm.itemNotInEnvsList = function (item) {
      return itemNotInList(item, vm.envsList)
    };

    /////////////////////////
    // 页面基础设施初始化 //
    ////////////////////////
    vm.category = 'cases';
    vm.pageResourceName = _dataManager.getResourceName(vm.category);
    vm.pageType = '管理';
    vm.pageTitle = vm.pageResourceName + vm.pageType;

    _dataManager.pageInit(vm.pageResourceName,vm.pageType,vm);

    //////////////////
    // 列表数据模型 //
    /////////////////
    vm.model = _dataManager.getModelByName('cases');
    ////////////
    // 标签数据模型 //
    ////////////
    vm.tabs = vm.options = _dataManager.getTabByName('cases');

    //////////////
    // form数据模型 //
    //////////////
    vm.formModel = _dataManager.getFormModelByName('cases');


    ///////////
    // 弹窗Modal //
    ///////////
    vm.setModal = function (item) {
      if (item === undefined) {
        // vm.form = {};
        ['requirementsList', 'envsList'].map(function (elem) {
          vm[elem] = [];
        });
        vm.modalType = 0;
        vm.modalTitle = "新增" + vm.pageResourceName;

      } else {

        // vm.form = item;
        ['requirementsList', 'envsList'].map(function (elem) {
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
        vm.itemList = response.json;
        vm.totalItems = response.total_items;
      });
    };
    vm.get(); //页面第一次加载


    vm.create = function () {
      var form = {};
      form.requirementsList = vm.requirementsList;
      form.envsList = vm.envsList;
      _dataManager.CreateOne(vm.category,form,function (response) {
        _dataManager.addNotification("success", "新" + vm.pageResourceName + "创建成功");
        // vm.get();
        $state.go('manage-case');
      });
    };

    vm.reset = function () {
      ['requirementsList', 'envsList'].map(function (elem) {
        vm[elem] = [];
      })
    };

    vm.update = function () {
      var form = {};
      form.requirementsList = vm.requirementsList;
      form.envsList = vm.envsList;
      _dataManager.UpdateOneByID(vm.category,vm.form,function (response) {
        _dataManager.addNotification("success", vm.pageResourceName + form.id + "修改成功");
        $state.go('manage-case');
      });
    };
    vm.remove = function (id) {
      _dataManager.DeleteOneByID(vm.category, id,function (response) {
        _dataManager.addNotification("success", vm.pageResourceName + id + "删除成功");
      });
    };
  }]);
