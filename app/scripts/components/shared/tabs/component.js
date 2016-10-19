/**
 * Created by mzvast on 2016/10/11.
 */
'use strict';
angular.module('manageApp')
  .component('tabsComponent', {
    transclude: true,
    templateUrl: 'scripts/components/shared/tabs/component.html',
    bindings: {
      model: '<',
      defaultActiveTabId:'<',
      onSelect: '&',
      name: '@'
    },
    controller: tabsController
  });

tabsController.$inject = [];

function tabsController() {
  var $ctrl = this;
  $ctrl.$onInit = function () {
    $ctrl.activeTabId = $ctrl.defaultActiveTabId!==undefined?$ctrl.defaultActiveTabId:-1;
  };

  $ctrl.selectTab = function (id) {
    $ctrl.activeTabId = id;
    $ctrl.onSelect({id:id});
  }
}
