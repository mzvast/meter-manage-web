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
    ['onProducts', 'onRequirements', 'onEnvs', 'onUsers','onCases']
      .map(function (elem) {
        return vm[elem] = false;
      });

    vm.setTopTab = function (value) {
      ['onProducts', 'onRequirements', 'onEnvs', 'onUsers','onCases']
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
    vm.executor = [];
    vm.addToUsersList = function (item) {
      if (itemNotInList(item, vm.executor)) {
        vm.executor.push(item);
      }
    };

    vm.casesList = [];
    vm.addToCasesList = function (item) {
      if (itemNotInList(item, vm.casesList)) {
        vm.casesList.push(item);
      }
    };

    var removeItemFromList = function (item, list) {
      console.log(item,list);
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
      removeItemFromList(item, vm.executor);
    };
    vm.removeFromCasesList = function (item) {
      removeItemFromList(item, vm.casesList);
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
      return itemNotInList(item, vm.executor)
    };
    vm.itemNotInCasesList = function (item) {
      return itemNotInList(item, vm.casesList)
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
      console.log(item);
      if (item === undefined) {
        // vm.form = {};
        ['productsList', 'requirementsList', 'envsList', 'executor','casesList'].map(function (elem) {
          vm[elem] = [];
        });
        vm.modalType = 0;
        vm.modalTitle = "新增" + vm.pageResourceName;
        vm.title = "新计划-"+moment.utc().local().format('YYYY-MM-DD');

      } else {
        // vm.form = item;
        ['productsList', 'requirementsList', 'envsList', 'executor','casesList'].map(function (elem) {
          vm[elem] = item[elem];
        });
        vm.modalType = 1;
        vm.modalTitle = "修改" + vm.pageResourceName;
        vm.title = item.title;
        vm.id = item.id;
      }
    };
    ///////////////////
    // 保存时候区分是新建还是修改 //
    ///////////////////
    vm.save = function () {
      console.log(vm.modalType);
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
      _dataManager.ReadListByQuery(vm.category,queryObj,function (response) {
        var itemList = [];
        response.data.forEach(function (plan) {
          // console.log(plan);
          var name = plan.creator.name;
          delete plan.creator;
          plan.creator = name;
          // console.log(plan.creator);
          var executor = [];
          executor.push(plan.executor);
          delete plan.executor;
          plan.executor = executor;
          itemList.push(plan);
          if(plan['create_date']){
            // console.log(plan['create_date']) ;
            plan['create_date'] = moment.utc(plan['create_date']).local().format('YYYY-MM-DD');
          }
        });
        vm.itemList = itemList;
        console.log(response.data);
        vm.totalItems = response.total_items;
      });
    };
    vm.get(); //页面第一次加载


    vm.create = function () {
      var form = {};
      form.productsList = vm.productsList;
      form.requirementsList = vm.requirementsList;
      form.envsList = vm.envsList;
      form.executor = vm.executor[0];
      form.title = vm.title;
      form.creator = {id:1,name:"Admin"};
      form.casesList = vm.casesList;
      _dataManager.CreateOne(vm.category,form,function (response) {
        _dataManager.addNotification("success", "新" + vm.pageResourceName + "创建成功");
        // vm.get();
        $state.go('manage-plan');
        vm.get();
      });
    };

    vm.reset = function () {
      ['productsList', 'requirementsList', 'envsList', 'executor'].map(function (elem) {
        vm[elem] = [];
      })
    };

    vm.update = function () {
      var form = {};
      form.productsList = vm.productsList;
      form.requirementsList = vm.requirementsList;
      form.envsList = vm.envsList;
      form.executor = vm.executor[0];
      form.title = vm.title;
      form.creator = {id:1,name:"Admin"};
      form.casesList = vm.casesList;


      _dataManager.UpdateOneByID(vm.category,form,vm.id,function (response) {
        _dataManager.addNotification("success", vm.pageResourceName + vm.id + "修改成功");
        $state.go('manage-plan');
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
