/**
 * Created by mzvast on 2016/10/11.
 */
'use strict';
angular.module('manageApp')
  .component('requirementModalComponent', {
    templateUrl: 'scripts/components/manage/requirement/requirementModal/component.html',
    bindings: {
      resolve: '<',
      close: '&',
      dismiss: '&'
    },
    controller: productModalController

  });

productModalController.$inject = ['tabService'];

function productModalController(tabService) {
  var $ctrl = this;

  $ctrl.$onInit = function () {
    $ctrl.editableItems = $ctrl.resolve.editableItems;
    $ctrl.title = $ctrl.resolve.title;
    $ctrl.form = $ctrl.resolve.form;

    $ctrl.types = tabService.get('requirements');
  };

  $ctrl.ok = function () {
    $ctrl.close({$value: $ctrl.form});
  };

  $ctrl.cancel = function () {
    $ctrl.dismiss({$value: 'cancel'});
  };
}
