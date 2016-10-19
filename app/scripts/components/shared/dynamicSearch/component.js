/**
 * Created by mzvast on 2016/10/11.
 */
'use strict';
angular.module('manageApp')
  .component('dynamicSearchComponent', {
    transclude: true,
    templateUrl: 'scripts/components/shared/dynamicSearch/component.html',
    bindings: {
      onSelectTab: '&',
      onSearch: '&',
      onClear: '&',
      defaultActiveTabId: '<',
      tabModel: '<',
      list: '<'
    },
    controller: dynamicSearchController
  });

dynamicSearchController.$inject = [];

function dynamicSearchController() {
  var $ctrl = this;

  $ctrl.$onInit = function () {
    $ctrl.activeTabId = $ctrl.defaultActiveTabId !== undefined ? $ctrl.defaultActiveTabId : -1;

    // $ctrl.tabsModel = [{
    //   id: -1,
    //   name: "全部"
    // }, {
    //   id: 0,
    //   name: "单元测试"
    // }, {
    //   id: 1,
    //   name: "集成测试"
    // }, {
    //   id: 2,
    //   name: "功能测试"
    // }, {
    //   id: 3,
    //   name: "性能测试"
    // }];
  };
  /**
   * 搜索
   */
  $ctrl.search = function () {
    $ctrl.onSearch({q: $ctrl.q});
  };

  $ctrl.clear = function () {
    $ctrl.q = '';
    $ctrl.onClear();
  };


  $ctrl.selectTab = function (id) {
    $ctrl.activeTabId = id;
    $ctrl.onSelectTab({type:id})
  }

}
