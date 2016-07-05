'use strict';

/**
 * @ngdoc function
 * @name manageApp.controller:ManageUserCtrl
 * @description
 * # ManageUserCtrl
 * Controller of the manageApp
 */
angular.module('manageApp')
    .controller('ManageUserCtrl', ['dataManager', 'uiManager', function(_dataManager, _uiManager) {
      var vm = this;
      vm.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];

      /////////////////////////
      // 页面基础设施初始化 //
      ////////////////////////
      _uiManager.pageInit("人员", "管理", vm);
      //////////////////
      // 列表数据模型 //
      /////////////////
      vm.model = {
        id: "ID",
        name: "名称",
        age:"年龄",
        skill:"技能",
        exp:"经验",
        create_date: "创建时间"
      };
      ////////////
      // 标签数据模型 //
      ////////////
      vm.tabs =vm.options = [{
        id: 0,
        name:"超级管理员"
      },{
        id:1,
        name:"管理员"
      },{
        id:2,
        name:"测试员"
      }];
      
      //////////////
      // form数据模型 //
      //////////////
      vm.formModel = {
        name: "名称",
        age:"年龄",
        skill:"技能",
        exp:"经验"
      };
      ////////////
      // 配置调试 //
      ////////////
      var log = _dataManager.log();

      /////////////
      // 资源连接 //
      /////////////
      var _C = _dataManager.C('users', vm),
          _R = _dataManager.R('users', vm),
          _U = _dataManager.U('users', vm),
          _D = _dataManager.D('users', vm);

      ///////////
      // 弹窗Modal //
      ///////////
      vm.setModal = function(item) {
        if (item === undefined) {
          vm.form = {};
          vm.selectedOption = vm.options[2];
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
        vm.form.type = vm.selectedOption.id;
        _C(vm.form);
      };

      vm.update = function() {
        vm.form.type = vm.selectedOption.id;
        _U(vm.form);
      };
      vm.remove = function(id) {
        _D(id);
      };
    }]);
