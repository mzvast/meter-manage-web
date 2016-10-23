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
    $ctrl.productLabels = ["单元测试", "集成测试", "功能测试","性能测试"];
    $ctrl.productTabModel = [{
      id:0,
      name:'用例结构'//'饼图'
    },{
      id:1,
      name:'通过率'//'柱状图'
    }];
    //所有产品
    analyzeService.get({category:'products'},function (response) {
      var data = response.data;
      var allArr = data.map(function (item) {
        return item.all;
      });
      var passArr = data.map(function (item) {
        return item.pass;
      });
      $ctrl.allProductsPieData = allArr;
      $ctrl.allProductsBarData = [allArr,passArr];

      $ctrl.allProductsTitle = '产品|全部';
    });
    //特定产品
    analyzeService.get({category:'products',id:1},function (response) {
      var data = response.data;
      var allArr = data.map(function (item) {
        return item.all;
      });
      var passArr = data.map(function (item) {
        return item.pass;
      });
      $ctrl.oneProductPieData = allArr;
      $ctrl.oneProductBarData = [allArr,passArr];

      $ctrl.oneProductTitle = '某产品-某测试计划';
    });

    $ctrl.vendorLabels = ["通过","失败"];

    $ctrl.vendorTabModel = [{
      id:0,
      name:'通过率'//'饼图'
    }];
    //所有厂家
    analyzeService.get({category:'vendors'},function (response) {
      var data = response.data;
      var all = data.all;
      var pass = data.pass;
      var fail = all - pass;

      $ctrl.allVendorsPieData = [all,fail];
      $ctrl.allVendorsBarData = [all,fail];

      $ctrl.allVendorsTitle = '厂家|全部';
    });
    //特定厂家
    analyzeService.get({category:'vendors',id:1},function (response) {
      var data = response.data;
      var all = data.all;
      var pass = data.pass;
      var fail = all - pass;

      $ctrl.oneVendorPieData = [all,fail];
      $ctrl.oneVendorBarData = [all,fail];

      $ctrl.oneVendorTitle = '某厂家-某测试计划';
    });

  };
}
