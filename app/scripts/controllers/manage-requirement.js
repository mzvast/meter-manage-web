'use strict';

/**
 * @ngdoc function
 * @name manageApp.controller:ManageRequirementCtrl
 * @description
 * # ManageRequirementCtrl
 * Controller of the manageApp
 */
angular.module('manageApp')
    .controller('ManageRequirementCtrl', ['dataManager', function(dataManager) {
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

        ///////////
        // 页面元数据 //
        ///////////
        self.pageResourceName = "需求";
        self.pageType = "管理";
        self.pageTitle = self.pageResourceName + self.pageType;
        ////////////
        // 定义资源别名 //
        ////////////
        self.resource = dataManager.requirements;
        //////////
        // 列表数据模型 //
        //////////
        self.model = {
            id: "ID",
            title: "名称",
            describe: "描述",
            type: "类型",
            create_date: "创建时间"
        };
        //////////////
        // form数据模型 //
        //////////////
        self.formModel = {
            id: "ID",
            title: "名称",
            describe: "描述",
            type: "类型"
        };


        ////////////////
        // 排序 //
        ////////////////
        self.predicate = 'id';
        self.reverse = true;
        self.order = function(predicate) {
            self.reverse = (self.predicate === predicate) ? !self.reverse : false;
            self.predicate = predicate;
            self.get();
        };
        ////////////////
        //分页  //
        ////////////////
        // self.totalItems = 100;
        self.currentPage = 1;
        self.itemsPerPage = 10;
        self.maxSize = 5; //显示的时候页码的最多个数，忽略该参数

        // self.setPage = function (pageNo) {
        //  self.currentPage = pageNo;
        // };

        self.pageChanged = function() {
            log('Page changed to: ' + self.currentPage);
            self.get();
        };
        /////////////
        // 搜索 //
        /////////////
        self.search = function(q) {
            log("q=" + q);
            self.currentPage = 1;
            dataManager.requirements.get({
                    current_page: self.currentPage,
                    items_per_page: self.itemsPerPage,
                    order_by: self.predicate,
                    q: q,
                    reverse: self.reverse
                }).$promise
                .then(function(response) {
                    log("搜索需求 SUCCESS!");
                    // console.dir(response);
                    self.itemList = response.json;
                    self.totalItems = response.total_items;
                });
        };
        self.resetSearch = function() {
            self.q = "";
            self.currentPage = 1;
            self.get();
        };
        ///////////
        // Modal //
        ///////////
        self.setModal = function(item) {
            if (item === undefined) {
                self.form = {};
                self.modalType = 0;
                self.modalTitle = "新增"+self.pageResourceName;
                return;
            } else {
                self.form = item;
                self.modalType = 1;
                self.modalTitle = "修改"+self.pageResourceName;
            }
            // console.log(self.selectedItem);
        };
        /////////////
        // 资源 //
        /////////////
        self.get = function() {
            self.resource.get({
                    current_page: self.currentPage,
                    items_per_page: self.itemsPerPage,
                    order_by: self.predicate,
                    reverse: self.reverse
                }).$promise
                .then(function(response) {
                    log("获取"+self.pageResourceName+" SUCCESS!");
                    // console.dir(response);
                    // console.dir(response.json);
                    self.itemList = response.json;
                    self.totalItems = response.total_items;
                });

        };

        self.get();

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
        }
        self.create = function() {
            // self.new.create_date = (new Date()).toISOString().slice(0, 10);
            log({ "json": self.form });
            self.resource.save({ "json": self.form }).$promise
                .then(function() {
                    log("新增资源 SUCCESS!");
                    // console.log(data);
                    dataManager.addNotification("success", "新"+self.pageResourceName+"创建成功");
                    self.get();
                });
        };
        self.update = function() {
            log({"json":self.form});
            self.resource.update({
                    id: self.form.id
                }, {
                    "json": self.form
                }).$promise
                .then(function() {
                    log("修改资源 SUCCESS!");
                    // console.log(data);
                    self.get();
                    dataManager.addNotification("success", self.pageResourceName + self.form.id + "修改成功");
                });
        };
        self.remove = function(id) {
            log({ id: id });
            self.resource.delete({ id: id }).$promise
                .then(function() {
                    log("删除资源 SUCCESS!");
                    // console.log(data);
                    dataManager.addNotification("success", self.pageResourceName + id + "删除成功");
                    self.get();
                });
        };
    }]);
