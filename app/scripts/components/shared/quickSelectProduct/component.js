/**
 * Created by mzvast on 2016/10/11.
 */
'use strict';
angular.module('manageApp')
  .component('quickSelectProductComponent', {
    templateUrl: 'scripts/components/shared/quickSelectProduct/component.html',
    bindings: {
      onAdd: '&',
      basket: '<'
    },
    controller: quickSelectProduct
  });

quickSelectProduct.$inject = ['productService','modelService','tabService'];

function quickSelectProduct(productService,modelService,tabService) {
  var $ctrl = this;

  $ctrl.$onInit = function () {
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
    $ctrl.type = -1;

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

  $ctrl.selectTab = function (type) {
    // console.log("type:"+type);
    $ctrl.type = type;
    refresh();
  };

  $ctrl.add = function (item) {
    $ctrl.onAdd({item:item});
  };

  $ctrl.checkInBasket = function (id) {
    var len = $ctrl.basket.length,i;
    for(i=0;i<len;i++){
      if ($ctrl.basket[i].id === id) return true;
    }
    return false;
  }




}
