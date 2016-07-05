'use strict';

/**
 * @ngdoc function
 * @name manageApp.controller:ManagePlanCtrl
 * @description
 * # ManagePlanCtrl
 * Controller of the manageApp
 */
angular.module('manageApp')
    .controller('ManagePlanCtrl', ['dataManager', 'uiManager', function(_dataManager, _uiManager) {
        var vm = this;
        vm.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
        ////////////
        // 配置调试 //
        ////////////
        var log = _dataManager.log();
        log("hello");
        ////////////
        // 新增测试计划 //
        ////////////
        vm.onProducts = true;
        vm.onRequirements = false;
        vm.onEnvs = false;
        vm.onUsers = false;
        vm.setTopTab = function(value) {
          ['onProducts','onRequirements','onEnvs','onUsers']
          .map(function(elem) {
            return vm[elem]=(value===elem);
          })
        };


        vm.productsList = [];
        vm.addToProductsList = function(item) {
            if (itemNotInList(item, vm.productsList)) {
                vm.productsList.push(item);
            }
        };
        vm.requirementsList = [];
        vm.addToRequirementsList = function(item) {
            if (itemNotInList(item, vm.requirementsList)) {
                vm.requirementsList.push(item);
            }

        };
        vm.envsList = [];
        vm.addToEnvsList = function(item) {
            if (itemNotInList(item, vm.envsList)) {
                vm.envsList.push(item);
            }

        };
        vm.usersList = [];
        vm.addToUsersList = function(item) {
            if (itemNotInList(item, vm.usersList)) {
                vm.usersList.push(item);
            }
        };

        var removeItemFromList = function (item, list) {
          var itemID = -1;
          list.map(function (elem,index) {
            if(elem.id === item.id){
              itemID = index;
            }
          });
          list.splice(itemID,1);
        };

      vm.removeFromProductsList = function (item) {
        removeItemFromList(item,vm.productsList);
      };
      vm.removeFromRequirementsList = function (item) {
        removeItemFromList(item,vm.requirementsList);
      };
      vm.removeFromEnvsList = function (item) {
        removeItemFromList(item,vm.envsList);
      };
      vm.removeFromUsersList = function (item) {
        removeItemFromList(item,vm.usersList);
      };
        // 操作按钮样式
        var itemNotInList = function(item, list) {
          var valid = true;
          list.map(function(elem) {
            if (elem.id === item.id) {
              valid = false;

            }
          });
          return valid;
        };

        vm.itemNotInProductsList = function(item) {
          return itemNotInList(item,vm.productsList)
        };

        vm.itemNotInRequirementsList = function(item) {
          return itemNotInList(item,vm.requirementsList)
        };
        vm.itemNotInEnvsList = function(item) {
          return itemNotInList(item,vm.envsList)
        };
        vm.itemNotInUsersList = function(item) {
          return itemNotInList(item,vm.usersList)
        };
        /////////////////////////
        // 页面基础设施初始化 //
        ////////////////////////
        _uiManager.pageInit("测试计划", "管理", vm);
        //////////////////
        // 列表数据模型 //
        /////////////////
        vm.model = {
            id: "ID",
            title: "名称",
            creator: "制定者",
            create_date: "创建时间"
        };
        ////////////
        // 标签数据模型 //
        ////////////
        vm.tabs =vm.options = [{
          id: 0,
          name:"未完成"
        },{
          id:1,
          name:"已完成"
        }];

        //////////////
        // form数据模型 //
        //////////////
        vm.formModel = {
            title: "名称",
            describe: "描述"
        };

        /////////////
        // 资源连接 //
        /////////////
      var _C = _dataManager.C('plans', vm),
          _R = _dataManager.R('plans', vm),
          _U = _dataManager.U('plans', vm),
          _D = _dataManager.D('plans', vm);
        ///////////
        // 弹窗Modal //
        ///////////
        vm.setModal = function(item) {
            if (item === undefined) {
                // vm.form = {};
                ['productsList','requirementsList','envsList','usersList'].map(function (elem) {
                  vm[elem] = [];
                });
                vm.modalType = 0;
                vm.modalTitle = "新增" + vm.pageResourceName;

            } else {
                // vm.form = item;
                log(item);
                ['productsList','requirementsList','envsList','usersList'].map(function (elem) {
                  vm[elem] = item[elem];
                });
                vm.modalType = 1;
                vm.modalTitle = "修改" + vm.pageResourceName;
            }
          // console.log(vm.selectedItem);
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
            var form = {};
            form.productsList = vm.productsList;
            form.requirementsList = vm.requirementsList;
            form.envsList = vm.envsList;
            form.usersList = vm.usersList;

            _C(form);
        };

        vm.reset = function () {
            ['productsList','requirementsList','envsList','usersList'].map(function (elem) {
                vm[elem] = [];
            })
        };

        vm.update = function() {
            var form = {};
            form.productsList = vm.productsList;
            form.requirementsList = vm.requirementsList;
            form.envsList = vm.envsList;
            form.usersList = vm.usersList;

            _U(vm.form);
        };
        vm.remove = function(id) {
            _D(id);
        };
    }]);
