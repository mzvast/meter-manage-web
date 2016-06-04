'use strict';

/**
 * @ngdoc function
 * @name manageApp.controller:ManageRequirementCtrl
 * @description
 * # ManageRequirementCtrl
 * Controller of the manageApp
 */
angular.module('manageApp')
    .controller('ManageRequirementCtrl', ['dataManager', 'uiManager', function(dataManager, uiManager) {
        var self = this;
        self.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        /////////////////////////
        // 页面基础设施初始化 //
        ////////////////////////
        uiManager.pageInit("需求", "管理", self);
        //////////////////
        // 列表数据模型 //
        /////////////////
        self.model = {
            id: "ID",
            title: "名称",
            describe: "描述",
            type: "类型",
            create_date: "创建时间"
        };
        ////////////
        // 标签数据模型 //
        ////////////
        self.tabs = {
            0: "单元测试",
            1: "集成测试",
            2: "功能测试",
            3: "性能测试"
        }
        self.setTab = function(value) {
            if (value === undefined) {
                self.type= value;
                self.get();
                return;
            } else {
                self.type= value;
                self.get();
            }
        };
        //////////////
        // form数据模型 //
        //////////////
        self.formModel = {
            title: "名称",
            describe: "描述",
            type: "类型"
        };
        ////////////
        // 配置调试 //
        ////////////
        var log = dataManager.log();

        /////////////
        // 资源连接 //
        /////////////
        ['C', 'R', 'U', 'D'].map(function(elem) {
            self[elem] = dataManager[elem]('requirements', self);
        })

        ///////////
        // 弹窗Modal //
        ///////////
        self.setModal = function(item) {
            if (item === undefined) {
                self.form = {};
                self.modalType = 0;
                self.modalTitle = "新增" + self.pageResourceName;
                return;
            } else {
                self.form = item;
                self.modalType = 1;
                self.modalTitle = "修改" + self.pageResourceName;
            };
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
            };
        };
        self.get = function() {
            var queryObj = {
                current_page: self.currentPage,
                items_per_page: self.itemsPerPage,
                order_by: self.predicate,
                q: self.q,
                reverse: self.reverse,
                type:self.type
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
