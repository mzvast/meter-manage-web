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
      title: '<'
    },
    controller: analyzeChartController
  });

analyzeChartController.$inject = [];

function analyzeChartController() {
  var $ctrl = this;

  $ctrl.$onInit = function () {
    $ctrl.activeTabId = $ctrl.defaultActiveTabId!==undefined?$ctrl.defaultActiveTabId:0;

    $ctrl.tabModel = [{
      id:0,
      name:'用例结构'//'饼图'
    },{
      id:1,
      name:'通过率'//'柱状图'
    }];

    $ctrl.series = ['总数','通过数']
  };

  $ctrl.selectTab = function (id) {
    $ctrl.activeTabId = id;
  };


}
