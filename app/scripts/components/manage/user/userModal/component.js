/**
 * Created by mzvast on 2016/10/11.
 */
'use strict';
angular.module('manageApp')
  .component('userModalComponent', {
    templateUrl: 'scripts/components/manage/user/userModal/component.html',
    bindings: {
      resolve: '<',
      close: '&',
      dismiss: '&'
    },
    controller: productModalController

  });

productModalController.$inject = [];

function productModalController() {
  var $ctrl = this;

  $ctrl.$onInit = function () {
    $ctrl.editableItems = $ctrl.resolve.editableItems;
    $ctrl.title = $ctrl.resolve.title;
    $ctrl.form = $ctrl.resolve.form;
    $ctrl.types = $ctrl.resolve.types;
  };

  $ctrl.ok = function () {
    $ctrl.close({$value: $ctrl.form});
  };

  $ctrl.cancel = function () {
    $ctrl.dismiss({$value: 'cancel'});
  };
}
