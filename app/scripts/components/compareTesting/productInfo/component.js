/**
 * Created by mzvast on 2016/10/27.
 */
'use strict';
angular.module('manageApp')
  .component('productInfoComponent', {
    templateUrl: 'scripts/components/compareTesting/productInfo/component.html',
    bindings: {
      form:'<',
      mcuInfos:'<',
      coreNum:'<',
      onOpenModal:'&',
      onSave:'&',
      onAddCore:'&',
      onRemoveCore:'&'
    },
    controller: productInfoController
  });
productInfoController.$inject = [];

function productInfoController(){
  var $ctrl = this;

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

  $ctrl.$onInit = function () {
    $ctrl.animationsEnabled = true;
  };

  $ctrl.addCore = function () {
    $ctrl.onAddCore();
  };

  $ctrl.removeCore = function () {
    $ctrl.onRemoveCore();
  };

  $ctrl.openModal = function (item) {
    $ctrl.onOpenModal({item:item});
  };

  $ctrl.submit = function () {
    $ctrl.onSave({form:$ctrl.form});
  }












}
