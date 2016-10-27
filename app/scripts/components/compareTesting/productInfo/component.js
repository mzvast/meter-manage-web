/**
 * Created by mzvast on 2016/10/27.
 */
'use strict';
angular.module('manageApp')
  .component('productInfoComponent', {
    templateUrl: 'scripts/components/compareTesting/productInfo/component.html',
    bindings: {},
    controller: productInfoController
  });

productInfoController.$inject = ['productInfoService','compareTestingService'];

function productInfoController(productInfoService,compareTestingService){
  var $ctrl = this;

  $ctrl.form = {};
  $ctrl.ready =false;
  var product;
//数据主要存在compareTestingService!
  $ctrl.$onInit = function () {
    product = compareTestingService.getProduct();

    productInfoService.get(product.id,function (res) {
      console.log(res);
      compareTestingService.initData(res);
      $ctrl.form = compareTestingService.getForm();
      $ctrl.mcu_infos = compareTestingService.getAllMcuInfo();
      $ctrl.ready = true;
    });

  };












}
