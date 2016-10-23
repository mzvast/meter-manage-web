/**
 * Created by mzvast on 2016/10/11.
 */
'use strict';
angular.module('manageApp')
  .component('analyzeChartComponent', {
    templateUrl: 'scripts/components/shared/analyzeChart/component.html',
    bindings: {
      defaultActiveTabId:'<',
      pieData: '<',
      barData: '<',
      labels: '<',
      options: '<',
      title: '<',
      tabModel: '<'
    },
    controller: analyzeChartController
  });

analyzeChartController.$inject = [];

function analyzeChartController() {
  var $ctrl = this;

  $ctrl.$onInit = function () {
    $ctrl.activeTabId = $ctrl.defaultActiveTabId||0;

    $ctrl.series = ['总数','通过数']
  };

  $ctrl.selectTab = function (id) {
    $ctrl.activeTabId = id;
  };


}
