'use strict';

/**
 * @ngdoc function
 * @name manageApp.controller:ManageResultCtrl
 * @description
 * # ManageResultCtrl
 * Controller of the manageApp
 */
angular.module('manageApp')
  .controller('ManageResultCtrl', ['$scope','$state','$stateParams','dataManager','beianManager',function ($scope,$state,$stateParams,_dataManager,_beianManager) {
    var vm = this;
    vm.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var pageResourceName = '结果';
    var pageType = '分析';
    vm.pageTitle = pageResourceName + pageType;

    vm.category = 'results';
    vm.tabs = _dataManager.getTabByName('results');
    vm.model = _dataManager.getModelByName('results');

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


    vm.get = function () {
      var queryObj = {
        current_page: vm.currentPage,
        items_per_page: vm.itemsPerPage,
        order_by: vm.predicate,
        q: vm.q,
        reverse: vm.reverse,
        type: vm.type===-1?undefined:vm.type
      };
      _dataManager.getResultListByQuery(queryObj,function (response) {
        vm.itemList = response.data;
        console.log(response.data);
        vm.itemList.forEach(function (item) {
          item['plan_name'] = item.plan[0]['name'];
          item['product_name'] = item.product[0]['name'];
          item['vendor_name'] = item.vendor[0]['name'];
          item['result_name'] = item.result===1?'成功':'失败';
          // item['classname'] = item.result===1?'bg-green':'bg-red';
          if(item['create_date']){
            // console.log(item['create_date']) ;
            item['create_date'] = moment.utc(item['create_date']).local().format('YYYY-MM-DD');
          }
        });
        vm.totalItems = response.total_items;

      });
      console.log(queryObj.type);
    };
    vm.get(); //页面第一次加载

  }]);
