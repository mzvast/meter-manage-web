/**
 * Created by mzvast on 2016/10/11.
 */
'use strict';
angular.module('manageApp')
  .component('productModalComponent', {
    templateUrl: 'scripts/components/manage/product/productModal/component.html',
    bindings: {
      resolve: '<',
      close: '&',
      dismiss: '&'
    },
    controller: productModalController

  });

productModalController.$inject = ['vendorService'];

function productModalController(vendorService) {
  var $ctrl = this;

  $ctrl.$onInit = function () {
    $ctrl.editableItems = $ctrl.resolve.editableItems;
    $ctrl.title = $ctrl.resolve.title;
    $ctrl.form = $ctrl.resolve.form||{};

    var queryObj = {
      current_page: 1,
      items_per_page: 100,
      order_by: 'id',
      q: '',
      reverse: false
    };

    vendorService.getList(queryObj,function (response) {
      var vendors = response.data.map(function (cur) {
        return {
          id:cur.id,
          name:cur.name
        }
      });
      console.log(vendors);
      $ctrl.vendors = vendors;
    })
  };

  $ctrl.ok = function () {
    $ctrl.close({$value: $ctrl.form});
  };

  $ctrl.cancel = function () {
    $ctrl.dismiss({$value: 'cancel'});
  };
}
