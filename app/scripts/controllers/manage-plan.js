'use strict';

/**
 * @ngdoc function
 * @name manageApp.controller:ManagePlanCtrl
 * @description
 * # ManagePlanCtrl
 * Controller of the manageApp
 */
angular.module('manageApp')
    .controller('ManagePlanCtrl', ['dataManager', 'uiManager', function(dataManager, uiManager) {
        var self = this;
        self.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
        ////////////
        // 配置调试 //
        ////////////
        var log = dataManager.log();
        log("hello");
        ////////////
        // 新增测试计划 //
        ////////////
        self.onProducts = true;
        self.onRequirements = false;
        self.onEnvs = false;
        self.onUsers = false;
        self.setTopTab = function(value) {
          ['onProducts','onRequirements','onEnvs','onUsers']
          .map(function(elem) {
            return self[elem]=(value===elem);
          })
        };
        self.productsList = [];
        var itemNotInList = function(item, list) {
            var valid = true;
            list.map(function(elem) {
                if (elem.id === item.id) {
                    valid = false;

                }
            });
            return valid;
        };
        self.addToProductsList = function(item) {
            if (itemNotInList(item, self.productsList)) {
                self.productsList.push(item);
            }

        };
        self.requirementsList = [];
        self.addToRequirementsList = function(item) {
            if (itemNotInList(item, self.requirementsList)) {
                self.requirementsList.push(item);
            }

        };
        self.envsList = [];
        self.addToEnvsList = function(item) {
            if (itemNotInList(item, self.envsList)) {
                self.envsList.push(item);
            }

        };
        self.usersList = [];
        self.addToUsersList = function(item) {
            if (itemNotInList(item, self.usersList)) {
                self.usersList.push(item);
            }

        };
        /////////////////////////
        // 页面基础设施初始化 //
        ////////////////////////
        uiManager.pageInit("计划", "管理", self);
        //////////////////
        // 列表数据模型 //
        /////////////////
        self.model = {
            id: "ID",
            title: "名称",
            creator: "制定者",
            create_date: "创建时间"
        };
        ////////////
        // 标签数据模型 //
        ////////////
        self.tabs = {
            0: "未完成",
            1: "已完成"
        };
        self.setTab = function(value) {
            self.type = value ? value : -1;
            self.get();
        };
        //////////////
        // form数据模型 //
        //////////////
        self.formModel = {
            title: "名称",
            describe: "描述"
        };

        /////////////
        // 资源连接 //
        /////////////
        ['C', 'R', 'U', 'D'].map(function(elem) {
            self[elem] = dataManager[elem]('plans', self);
        });
        ///////////
        // 弹窗Modal //
        ///////////
        self.setModal = function(item) {
            if (item === undefined) {
                self.form = {};
                self.modalType = 0;
                self.modalTitle = "新增" + self.pageResourceName;

            } else {
                self.form = item;
                self.modalType = 1;
                self.modalTitle = "修改" + self.pageResourceName;
            }
          // console.log(self.selectedItem);
        };
        ///////////////////
        // 保存时候区分是新建还是修改 //
        ///////////////////
        self.save = function() {
            switch (self.modalType) {
                case 0:
                    self.create();
                    break;
                case 1:
                    self.update();
                    break;
                default:
                    return;
            }
        };
        self.get = function() {
            var queryObj = {
                current_page: self.currentPage,
                items_per_page: self.itemsPerPage,
                order_by: self.predicate,
                q: self.q,
                reverse: self.reverse,
                type: self.type || -1
            };
            self.R(queryObj);
        };
        self.get(); //页面第一次加载
        self.create = function() {
            self.C(self.form);
        };

        self.update = function() {
            self.U(self.form);
        };
        self.remove = function(id) {
            self.D(id);
        };
    }]);
