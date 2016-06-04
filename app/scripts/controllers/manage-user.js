'use strict';

/**
 * @ngdoc function
 * @name manageApp.controller:ManageUserCtrl
 * @description
 * # ManageUserCtrl
 * Controller of the manageApp
 */
angular.module('manageApp')
    .controller('ManageUserCtrl', ['dataManager', 'uiManager', function(dataManager, uiManager) {
        var self = this;
        self.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
        /////////////////////////
        // 页面基础设施初始化 //
        ////////////////////////
        uiManager.pageInit("人员", "管理", self);
        //////////////////
        // 列表数据模型 //
        /////////////////
        self.model = {
            id: "ID",
            name: "名称",
            age:"年龄",
            skill:"技能",
            exp:"经验",
            perm:"权限",
            create_date: "创建时间"
        };
        //////////////
        // form数据模型 //
        //////////////
        self.formModel = {
            name: "名称",
            age:"年龄",
            skill:"技能",
            exp:"经验",
            perm:"权限",
        };
        ////////////
        // 配置调试 //
        ////////////
        var log = dataManager.log();

        /////////////
        // 资源连接 //
        /////////////
        ['C', 'R', 'U', 'D'].map(function(elem) {
            self[elem] = dataManager[elem]('users', self);
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
                reverse: self.reverse
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
