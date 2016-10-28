/**
 * Created by mzvast on 2016/10/27.
 */
'use strict';
angular.module('manageApp')
  .component('productInfoComponent', {
    templateUrl: 'scripts/components/compareTesting/productInfo/component.html',
    bindings: {},
    controller: productInfoController
  });

productInfoController.$inject = ['$uibModal','productInfoService','compareTestingService'];

function productInfoController($uibModal,productInfoService,compareTestingService){
  var $ctrl = this;

  $ctrl.form = {};
  $ctrl.ready =false;
  $ctrl.program_for_meter_options = [
    {
      "name": "0.2s级三相智能电能表",
      "group":"0.2s级"
    },
    {
      "name": "0.2S级三相智能电能表(互感器接入100V) ",
      "group":"0.2s级"
    },
    {
      "name": "0.5s级三相智能电能表",
      "group":"0.5s级"
    },
    {
      "name": "0.5S级三相智能电能表(互感器接入100V)",
      "group":"0.5s级"
    },
    {
      "name": "0.5s级三相本地费控智能电能表（模块-CPU卡-开关外置）",
      "group":"0.5s级"
    },
    {
      "name": "0.5s级三相费控智能电能表（模块-远程-开关外置）",
      "group":"0.5s级"
    },
    {
      "name": "1级三相智能电能表(互感器接入100V)",
      "group":"1级"
    },
    {
      "name": "1级三相智能电能表(互感器接入)",
      "group":"1级"
    },
    {
      "name": "1级三相本地费控智能电能表（CPU卡-开关外置）",
      "group":"1级"
    },
    {
      "name": "1级三相本地费控智能电能表（CPU卡-开关内置）",
      "group":"1级"
    },
    {
      "name": "1级三相费控智能电能表（远程-开关外置）",
      "group":"1级"
    },
    {
      "name": "1级三相费控智能电能表（远程-开关内置）",
      "group":"1级"
    },
    {
      "name": "1级三相本地费控智能电能表（模块- CPU卡-开关外置）",
      "group":"1级"
    },
    {
      "name": "1级三相本地费控智能电能表（模块- CPU卡-开关内置）",
      "group":"1级"
    },
    {
      "name": "1级三相费控智能电能表（模块-远程-开关外置）",
      "group":"1级"
    },
    {
      "name": "1级三相费控智能电能表（模块-远程-开关内置）",
      "group":"1级"
    },
    {
      "name": "2级单相本地费控智能电能表（CPU卡-开关外置）",
      "group": "2级"
    },
    {
      "name": "2级单相本地费控智能电能表（CPU卡-开关内置）",
      "group": "2级"
    },
    {
      "name": "2级单相本地费控智能电能表（模块-CPU卡-开关外置）",
      "group": "2级"
    },
    {
      "name": "2级单相本地费控智能电能表（模块-CPU卡-开关内置）",
      "group": "2级"
    },
    {
      "name": "2级单相费控智能电能表（远程-开关外置）",
      "group": "2级"
    },
    {
      "name": "2级单相费控智能电能表（远程-开关内置）",
      "group": "2级"
    },
    {
      "name": "2级单相费控智能电能表（模块-远程-开关外置）",
      "group": "2级"
    },
    {
      "name": "2级单相费控智能电能表（模块-远程-开关内置）",
      "group": "2级"
    },
    {
      "name": "2级单相静止式多费率电能表",
      "group": "2级"
    },
    {
      "name": "2级单相静止式多费率电能表(模块)",
      "group": "2级"
    }
  ];
  $ctrl.program_type_options = [
    {
      "name": "通用程序",
      "value": "normal"
    },
    {
      "name": "非通用程序",
      "value": "abnormal"
    }
  ];
  var product;
//数据主要存在compareTestingService!
  $ctrl.$onInit = function () {
    $ctrl.animationsEnabled = true;
    product = compareTestingService.getProduct();

    productInfoService.get(product.id,function (res) {
      console.log(res);
      compareTestingService.initData(res);
      $ctrl.form = compareTestingService.getForm();
      $ctrl.mcu_infos = compareTestingService.getAllMcuInfo();
      $ctrl.coreNum =compareTestingService.getCoreNum();
      $ctrl.ready = true;
    });

  };

  $ctrl.addCore = function () {
    compareTestingService.addCore();
    $ctrl.mcu_infos = compareTestingService.getAllMcuInfo();
    $ctrl.coreNum =compareTestingService.getCoreNum();
  };

  $ctrl.removeCore = function () {
    compareTestingService.removeCore($ctrl.coreNum-1);
    $ctrl.mcu_infos = compareTestingService.getAllMcuInfo();
    $ctrl.coreNum =compareTestingService.getCoreNum();
  };

  $ctrl.openModal = function (item) {
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

      modalInstance.result.then(function (formObj) {//保存新增
        // formObj.type = formObj.type.id;//解码
        console.log('ok:',formObj);
        compareTestingService.setMcuInfo(formObj['mcu_id'],formObj);
        console.log('ok2:',compareTestingService.getMcuInfo(formObj['mcu_id']));
      }, function () {
        // console.info('dismissed at: ' + new Date());
      });
    })();
  };












}
