'use strict';
angular.module('manageApp')
  .component('compareTestingDoComponent', {
    templateUrl: 'scripts/components/compareTesting/do/component.html',
    bindings: {},
    controller: compareTestingDoController
  });

compareTestingDoController.$inject = ['$state','productInfoService','compareTestingService','$uibModal'];

function compareTestingDoController($state,productInfoService,compareTestingService,$uibModal)
{
  var $ctrl = this;
  $ctrl.productReady=false;

  $ctrl.$onInit = function () {
    $ctrl.title = compareTestingService.getTitle();
    $ctrl.product = compareTestingService.getProduct();

    $ctrl.activeTabId = 0;
    $ctrl.tabModel = [{
      id:0,
      name:'产品信息'
    },{
      id:1,
      name:'参数配置'
    },{
      id:2,
      name:'HEX文件'
    }];

    productInfoService.get($ctrl.product.id,function (res) {
      console.log('productInfoService->>>>',res);
      compareTestingService.initData(res);
      $ctrl.form = compareTestingService.getForm();
      $ctrl.mcuInfos = compareTestingService.getAllMcuInfo();
      $ctrl.coreNum =compareTestingService.getCoreNum();

      $ctrl.args = compareTestingService.getArgs();

      $ctrl.hexObj = compareTestingService.getAllHex();
      $ctrl.productReady = true;
    });

  };

  $ctrl.selectTab = function(id){
    $ctrl.activeTabId = id;
  };

  $ctrl.finish = function () {
    compareTestingService.finish(function (res) {
      console.log(res);
      $state.go('compareTesting',{},{reload: true});
    });
  };

  /**
   * product info 相关
   *
   */

  $ctrl.openMcuModal = function (item) {
    console.log(item);
    (function () {
      var modalInstance = $uibModal.open({
        animation: $ctrl.animationsEnabled,
        component: 'mcuModalComponent',
        resolve: {
          title: function () {
            return 'MCU信息';
          },
          mcu_info: function () {
            return item;
          }
        }
      });

      modalInstance.result.then(function (formObj) {//保存mcu_info的信息
        compareTestingService.setMcuInfo(formObj['mcu_id'],formObj);
        // console.log('feedback',compareTestingService.getMcuInfo(formObj['mcu_id']));
        // console.log('feedback',compareTestingService.getAllMcuInfo());
      }, function () {
      });
    })();
  };

  $ctrl.addCore = function () {
    compareTestingService.addCore();
  };

  $ctrl.removeCore = function () {
    compareTestingService.removeCore();
  };

  $ctrl.saveProductForm = function (form) {//保存除了mcu_info的产品信息
    // console.log(form);
    compareTestingService.setForm(form);
  };

  /**
   * Args 相关
   * @param args
   */

  $ctrl.saveArgs = function(args){
    compareTestingService.setArgs(args);
  };


  /**
   * 比对相关
   */

  $ctrl.doTest = function (item) {
    console.log(item);
    (function () {
      var modalInstance = $uibModal.open({
        animation: $ctrl.animationsEnabled,
        component: 'recordModalComponent',
        resolve: {
          title: function () {
            return '用例执行';
          },
          caseId: function () {
             return item.id;
          }
        }
      });

      modalInstance.result.then(function (formObj) {//保存新增
        // formObj.type = formObj.type.id;//解码
        // console.log(formObj);
        compareTestingService.addResult(formObj);
        $ctrl.result = compareTestingService.getResult();
      }, function () {
        // console.info('dismissed at: ' + new Date());
      });
    })();
  };






}

