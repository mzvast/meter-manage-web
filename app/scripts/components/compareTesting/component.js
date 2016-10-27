'use strict';
angular.module('manageApp')
  .component('compareTestingComponent', {
    templateUrl: 'scripts/components/compareTesting/component.html',
    bindings: {},
    controller: compareTestingController
  });

compareTestingController.$inject = ['compareTestingService','authGuard', '$state', '$uibModal', 'productService', 'modelService', 'tabService', 'formModelService', 'notificationService'];

function compareTestingController(compareTestingService,authGuard, $state, $uibModal, productService, modelService, tabService, formModelService, notificationService)
{
  var $ctrl = this;

  $ctrl.$onInit = function () {
    $ctrl.title = '一致性测试执行';
    $ctrl.tableModel = modelService.get('products');
    $ctrl.tabModel = tabService.get('products');
    $ctrl.itemList = [];

    $ctrl.totalItems = 1;
    $ctrl.currentPage = 1;
    $ctrl.maxSize = 5;
    $ctrl.itemsPerPage = 10;

    $ctrl.predicate = 'id';
    $ctrl.q = '';
    $ctrl.reverse = false;
    $ctrl.type = 0;//未完成计划


    refresh();
  };

  function getQueryObj() {
    return {
      current_page: $ctrl.currentPage,
      items_per_page: $ctrl.itemsPerPage,
      order_by: $ctrl.predicate,
      q: $ctrl.q,
      reverse: $ctrl.reverse,
      type: $ctrl.type === -1 ? undefined : $ctrl.type
    };
  }

  function refresh() {
    productService.getList(getQueryObj(), function (json) {
      console.log(json.data);

      $ctrl.itemList = json.data.map(function (item) {
        if (item['create_date']) {
          item['create_date'] = moment.utc(item['create_date']).local().format('YYYY-MM-DD');
        }
        //修复厂家名称和厂家代码的嵌套
        if (item.vendor && item.vendor.name && item.vendor.code) {
          var name = item.vendor.name;
          var code = item.vendor.code;
          var vendor_id = item.vendor.id;
          item.vendor = name;
          item.vendor_code = code;
          item.vendor_id = vendor_id;
        }
        return item;
      });
      $ctrl.totalItems = json.total_items;
      $ctrl.currentPage = json.current_page;
    });
  }


  $ctrl.pageChanged = function () {
    refresh();
    console.log($ctrl.currentPage)
  };

  $ctrl.order = function (key) {
    if ($ctrl.predicate === key) {
      $ctrl.reverse = !$ctrl.reverse;
    } else {
      $ctrl.predicate = key;
    }
    refresh();
    console.log("ordered by " + key)
  };

  $ctrl.animationsEnabled = true;

  $ctrl.search = function (q) {
    console.log('searching for ', q);
    $ctrl.q = q;
    refresh();
  };

  $ctrl.clear = function () {
    $ctrl.q = '';
    refresh();
  };

  $ctrl.action = function (item) {
    console.log(item);
    compareTestingService.setProduct(item);
    $state.go("compare.do");
  };






}

