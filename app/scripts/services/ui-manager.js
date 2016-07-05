'use strict';

/**
 * @ngdoc service
 * @name manageApp.uiManager
 * @description
 * # uiManager
 * Service in the manageApp.
 */
angular.module('manageApp')
    .service('uiManager', ['dataManager', function(_dataManager) {
        // AngularJS will instantiate a singleton by calling "new" on this function
        var self = this;
        ////////////
        // 配置调试 //
        ////////////
        var log = _dataManager.log();
        /////////////////////
        // 页面All初始化构造函数bundle //
        /////////////////////
        self.pageInit = function(pageResourceName, pageType, vm) {
            pageMetaDateConstructor(pageResourceName, pageType, vm);
            paginationConstructor(vm);
            sortConstructor(vm);
            searchConstructor(vm);
            setTabConstructor(vm);
        };
        ///////////////
        // 页面元数据构造函数 //
        ///////////////
        var pageMetaDateConstructor = function(pageResourceName, pageType, vm) {
            return function() {
                vm.pageResourceName = pageResourceName;
                vm.pageType = pageType;
                vm.pageTitle = vm.pageResourceName + vm.pageType;
            }();
        };
        ////////////
        // 分页构造函数 //
        ////////////
        var paginationConstructor = function(vm) {
            return function() {
                // vm.totalItems = 100;
                vm.currentPage = 1;
                vm.itemsPerPage = 10;
                vm.maxSize = 5; //显示的时候页码的最多个数，忽略该参数

                // vm.setPage = function (pageNo) {
                //  vm.currentPage = pageNo;
                // };

                vm.pageChanged = function() {
                    log('Page changed to: ' + vm.currentPage);
                    vm.get();
                };
            }();
        };
        ////////////
        // 排序构造函数 //
        ////////////
        var sortConstructor = function(vm) {
            return function() {
                vm.predicate = 'id';
                vm.reverse = true;
                vm.order = function(predicate) {
                    vm.reverse = (vm.predicate === predicate) ? !vm.reverse : false;
                    vm.predicate = predicate;
                    vm.get();
                };
            }();
        };
        ////////////
        // 搜索构造函数 //
        ////////////
        var searchConstructor = function(vm) {
            return function() {
                vm.search = function(q) {
                    log("q=" + q);
                    if (q === undefined) {
                        vm.q = "";
                        vm.get();
                        return;
                    }
                    vm.q = q;
                    vm.get();
                    vm.currentPage = 1;
                };
            }();
        };
      /**
       * 设置标签构造函数
       * @param vm
       */
        var setTabConstructor = function (vm) {
          return function () {
            vm.setTab = function (value) {
              log("value="+value);
              if (typeof value === "undefined") {
                vm.type = -1;
              }else{
                vm.type = value;
              }
              vm.get();
            };
          }();
        }
    }]);
