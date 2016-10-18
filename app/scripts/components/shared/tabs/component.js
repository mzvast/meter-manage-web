/**
 * Created by mzvast on 2016/10/11.
 */
'use strict';
angular.module('manageApp')
  .component('tabsComponent', {
    transclude: true,
    templateUrl: 'scripts/components/shared/tabs/component.html',
    bindings: {
      tabs: '<',
      onSelect: '&',
      name: '@'
    },
    controller: function($document,tabService) {
      var $ctrl = this;
      $ctrl.$onInit = function () {
        $ctrl.tabs = tabService.get($ctrl.name);
      };

      $ctrl.selectTab = function (tabID) {
        console.log(tabID);
      }
    },
  });
