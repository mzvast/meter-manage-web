/**
 * Created by mzvast on 2016/10/11.
 */
'use strict';
angular.module('manageApp')
  .component('mcuModalComponent', {
    templateUrl: 'scripts/components/compareTesting/productInfo/mcuModal/component.html',
    bindings: {
      resolve: '<',
      close: '&',
      dismiss: '&'
    },
    controller: mcuModalController

  });

mcuModalController.$inject = ['caseService','formModelService'];

function mcuModalController(caseService,formModelService) {
  var $ctrl = this;

  $ctrl.$onInit = function () {
    $ctrl.form = {};
    $ctrl.record = '数据正常';
    $ctrl.title = $ctrl.resolve.title;
    $ctrl.mcu_info = $ctrl.resolve.mcu_info;

  };



  $ctrl.ok = function () {
    $ctrl.close({$value: $ctrl.mcu_info});
  };

  $ctrl.cancel = function () {
    $ctrl.dismiss({$value: 'cancel'});
  };


}
