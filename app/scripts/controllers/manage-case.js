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
    /**
     * 标题配置
     */
    vm.pageResourceName = _dataManager.getResourceName(vm.category);
    vm.pageTitle = vm.pageResourceName + (vm.canEdit?"管理":"选择");
    /**
     * 页码配置
     */
    vm.currentPage = 1;
    vm.itemsPerPage = 10;
    vm.maxSize = 5; //显示的时候页码的最多个数，忽略该参数
    vm.pageChanged = function() {
      vm.get();
    };
    /**
     * 排序
     */
    vm.predicate = 'id';
    vm.reverse = true;
    vm.order = function(predicate) {
      vm.reverse = (vm.predicate === predicate) ? !vm.reverse : false;
      vm.predicate = predicate;
      vm.get();
    };
    /**
     * 搜索
     */
    vm.search = function(q) {
      if (q === undefined) {
        vm.q = "";
        vm.get();
        return;
      }
      vm.q = q;
      vm.get();
      vm.currentPage = 1;
    };
    /**
     * Tab设置
     */
    vm.setTab = function (value) {
      if (typeof value === "undefined") {
        vm.type = -1;
      }else{
        vm.type = value;
      }
      vm.get();
    };

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
    // 新建或修改 //
    ///////////
    vm.setModal = function (item) {
      console.log(item);
      if (item === undefined) {
        // vm.form = {};
        ['requirementsList', 'envsList'].map(function (elem) {
          vm[elem] = [];
        });
        vm.modalType = 0;
        vm.modalTitle = "新增" + vm.pageResourceName;
        vm.title = "新用例-"+moment.utc().local().format('YYYY-MM-DD');

        vm.detail = undefined;
        vm.describe = undefined;
        vm.pre_condition = undefined;
        vm.expout = undefined;

      } else {

        // vm.form = item;
        ['requirementsList', 'envsList'].map(function (elem) {
          vm[elem] = item[elem];
        });
        vm.modalType = 1;
        vm.modalTitle = "修改" + vm.pageResourceName;
        vm.title = item.title;
        vm.id = item.id;
        vm.detail = item.detail;
        vm.describe = item.describe;
        vm.pre_condition = item.pre_condition;
        vm.expout = item.expout;
        vm.selectedOption = vm.options[item.type];
        console.log(vm.options[item.type]);
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
        type: vm.type===-1?undefined:vm.type
      };
      console.log(vm.type);
      _dataManager.ReadListByQuery(vm.category,queryObj,function (response) {
        vm.itemList = response.data;
        vm.totalItems = response.total_items;
        console.log(response.data);
      });
    };
    vm.get(); //页面第一次加载


    vm.create = function () {
      var form = {};
      form.creator = "Admin";
      form.creator_id = 1;
      form.requirementsList = vm.requirementsList.map(function (item) {
        return item.id;
      });
      form.envsList = vm.envsList.map(function (item) {
        return item.id;
      });
      form.title = vm.title;
      form.describe = vm.describe;
      form.detail = vm.detail;
      form.pre_condition = vm.pre_condition;
      form.expout = vm.expout;
      form.type = vm.selectedOption.id;
      _dataManager.CreateOne(vm.category,form,function (response) {
        _dataManager.addNotification("success", "新" + vm.pageResourceName + "创建成功");
        // vm.get();
        $state.go('manage-case');
        vm.get();
      });
    };

    vm.reset = function () {
      ['requirementsList', 'envsList'].map(function (elem) {
        vm[elem] = [];
      })
    };

    vm.update = function () {
      var form = {};
      form.requirementsList = vm.requirementsList.map(function (item) {
        return item.id;
      });
      form.envsList = vm.envsList.map(function (item) {
        return item.id;
      });
      form.title = vm.title;
      form.describe = vm.describe;
      form.detail = vm.detail;
      form.pre_condition = vm.pre_condition;
      form.expout = vm.expout;
      form.type = vm.selectedOption.id;
      _dataManager.UpdateOneByID(vm.category,form,vm.id,function (response) {
        _dataManager.addNotification("success", vm.pageResourceName + vm.id + "修改成功");
        $state.go('manage-case');
        vm.get();
      });
    };
    vm.remove = function (id) {
      _dataManager.DeleteOneByID(vm.category, id,function (response) {
        _dataManager.addNotification("success", vm.pageResourceName + id + "删除成功");
        vm.get();
      });
    };
  }]);
