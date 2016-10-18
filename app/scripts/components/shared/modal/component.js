/**
 * Created by mzvast on 2016/10/11.
 */
'use strict';
angular.module('manageApp')
  .component('modalComponent', {
    templateUrl: 'scripts/components/shared/modal/component.html',
    bindings: {
      resolve: '<',
      close: '&',
      dismiss: '&'
    },
    controller: modalController

  });

modalController.$inject = ['$document'];

function modalController($document) {
  var $ctrl = this;

  $ctrl.$onInit = function () {
    $ctrl.items = $ctrl.resolve.items;
    $ctrl.selected = {
      item: $ctrl.items[0]
    };
  };

  $ctrl.ok = function () {
    $ctrl.close({$value: $ctrl.selected.item});
  };

  $ctrl.cancel = function () {
    $ctrl.dismiss({$value: 'cancel'});
  };
}
