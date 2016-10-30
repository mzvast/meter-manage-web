'use strict';
angular.module('manageApp')
  .component('compareTestingComponent', {
    templateUrl: 'scripts/components/compareTesting/component.html',
    bindings: {},
    controller: compareTestingController
  });

compareTestingController.$inject = ['wsService','compareTestingService','authGuard', '$state', '$uibModal', 'productService', 'modelService', 'tabService', 'formModelService', 'notificationService'];

function compareTestingController(wsService,compareTestingService,authGuard, $state, $uibModal, productService, modelService, tabService, formModelService, notificationService)
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
    productService.getList(getQueryObj(), function (res) {
      console.log(res);
      $ctrl.itemList = res.itemList;
      $ctrl.totalItems = res.total_items;
      $ctrl.currentPage = res.current_page;
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
    console.log('setting product:',item);
    compareTestingService.setProduct(item);
    wsService.setMode(item.type+1);
    $state.go("compare.do");
  };






}

