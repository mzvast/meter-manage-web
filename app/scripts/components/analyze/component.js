/**
 * Created by mzvast on 2016/10/20.
 */
'use strict';
angular.module('manageApp')
  .component('analyzeComponent', {
    templateUrl: 'scripts/components/analyze/component.html',
    bindings: {

    },
    controller: analyzeController
  });

analyzeController.$inject = ['authGuard','$state','analyzeService'];

function analyzeController(authGuard,$state,analyzeService) {
  var $ctrl = this;

  $ctrl.$onInit = function () {
    $ctrl.labels = ["单元测试", "集成测试", "功能测试","性能测试"];
    analyzeService.get({category:'products'},function (response) {
      var data = response.data;
      var allArr = data.map(function (item) {
        return item.all;
      });
      var passArr = data.map(function (item) {
        return item.pass;
      });
      $ctrl.pieData = allArr;
      $ctrl.barData = [allArr,passArr];

      $ctrl.title = '结果分类统计';
    });

  };

  //TODO 所有厂家
  //TODO 特定厂家
  //TODO 所有产品
  //TODO 特定产品



}
