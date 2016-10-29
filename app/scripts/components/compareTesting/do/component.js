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

    if($ctrl.product){
      productInfoService.get($ctrl.product.id,function (res) {
        console.log(res);
        compareTestingService.initData(res);
        $ctrl.renderInitData();
      });
    }else{
      $ctrl.mock();//自动mock数据
    }



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
   * 初始化数据
   */
  $ctrl.renderInitData = function () {
    $ctrl.refreshProductForm();
    $ctrl.refreshMcuInfos();
    $ctrl.refreshCoreNum();

    $ctrl.refreshArgs();

    $ctrl.refreshHexObj();
    $ctrl.productReady = true;
  };

  /**
   * product info 相关
   *
   */

  $ctrl.saveProductForm = function (form) {//保存除了mcu_info的产品信息
    // console.log(form);
    compareTestingService.setForm(form);
  };

  $ctrl.refreshProductForm = function () {
    $ctrl.form = compareTestingService.getForm();
  };

  $ctrl.refreshCoreNum = function () {
    $ctrl.coreNum =compareTestingService.getCoreNum();
  };

  $ctrl.addCore = function () {
    compareTestingService.addCore();
    $ctrl.refreshCoreNum();
  };

  $ctrl.removeCore = function () {
    compareTestingService.removeCore();
    $ctrl.refreshCoreNum();
  };

  $ctrl.setMcuInfo = function(mcu_id,obj){
    compareTestingService.setMcuInfo(obj['mcu_id'],obj);
  };
  $ctrl.refreshMcuInfos = function () {
    $ctrl.mcuInfos = compareTestingService.getAllMcuInfo();
  };

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
      modalInstance.result
        .then(function (formObj) {//保存mcu_info的信息
        $ctrl.setMcuInfo(formObj['mcu_id'],formObj);
      }, function () {
      });
    })();
  };


  /**
   * Args 相关
   * @param args
   */

  $ctrl.saveArgs = function(args){
    compareTestingService.setArgs(args);
  };

  $ctrl.refreshArgs = function () {
    $ctrl.args = compareTestingService.getArgs();
  };

  /**
   * Hex相关
   */
  $ctrl.saveHexObj = function (hexObj) {
    compareTestingService.setHexObj(hexObj);
  };

  $ctrl.refreshHexObj = function () {
    $ctrl.hexObj = compareTestingService.getAllHex();
  };

  /**
   * Mock 数据
   */

  $ctrl.mock = function () {
    $ctrl.saveProductForm({
      'costcontrol_type': 'em_esam',
      'i_spec': '5(60)A',
      'v_spec': '220V',
      'program_for_meter': '0.2s级三相智能电能表',
      'program_type': 'normal',
      'program_version': 'V 2.0',
      'report_num': '0123456789'
    });
    compareTestingService.clearMcuInfo();
    $ctrl.addCore();
    $ctrl.addCore();
    $ctrl.setMcuInfo(1, {
      "mcu_id": 1,
      "mcu_model": "Test_1",
      "protect_addr": [
        {
          "start": "12000",
          "end": "121ff"
        },
        {
          "start": "13000",
          "end": "133ff"
        }
      ],
      "reserve_addr": [
        {
          "start": "12000",
          "end": "121ff"
        },
        {
          "start": "13000",
          "end": "133ff"
        }
      ],
      "memory_addr": {
        "start": "4000",
        "end": "13fff"
      },
      "software_addr": {
        "start": "4000",
        "end": "97ff"
      }
    });
    $ctrl.setMcuInfo(2, {
      "mcu_id": 2,
      "mcu_model": "Test_2",
      "protect_addr": [
        {
          "start": "12000",
          "end": "121ff"
        },
        {
          "start": "13000",
          "end": "133ff"
        }
      ],
      "reserve_addr": [
        {
          "start": "12000",
          "end": "121ff"
        },
        {
          "start": "13000",
          "end": "133ff"
        }
      ],
      "memory_addr": {
        "start": "4000",
        "end": "13fff"
      },
      "software_addr": {
        "start": "4000",
        "end": "97ff"
      }
    });
    $ctrl.saveArgs([
        {
          "bit": 1,
          "on": true,
          "num": "xxxxxxxxxxxx",
          "addr": "xxxxxxxxxxxx",
          "type": "single_phase",
          "vol": 220,
          "key_index": "04"
        },
        {
          "bit": 2,
          "on": true,
          "num": "xxxxxxxxxxxx",
          "addr": "xxxxxxxxxxxx",
          "type": "single_phase",
          "vol": 220,
          "key_index": "04"
        },
        {
          "bit": 3,
          "on": false,
          "num": "xxxxxxxxxxxx",
          "addr": "xxxxxxxxxxxx",
          "type": "single_phase",
          "vol": 220,
          "key_index": "04"
        },
        {
          "bit": 4,
          "on": false,
          "num": "xxxxxxxxxxxx",
          "addr": "xxxxxxxxxxxx",
          "type": "single_phase",
          "vol": 220,
          "key_index": "04"
        },
        {
          "bit": 5,
          "on": false,
          "num": "xxxxxxxxxxxx",
          "addr": "xxxxxxxxxxxx",
          "type": "three_phase",
          "vol": 220,
          "key_index": "04"
        },
        {
          "bit": 6,
          "on": false,
          "num": "xxxxxxxxxxxx",
          "addr": "xxxxxxxxxxxx",
          "type": "three_phase",
          "vol": 220,
          "key_index": "04"
        },
        {
          "bit": 7,
          "on": false,
          "num": "xxxxxxxxxxxx",
          "addr": "xxxxxxxxxxxx",
          "type": "three_phase",
          "vol": 220,
          "key_index": "04"
        },
        {
          "bit": 8,
          "on": false,
          "num": "xxxxxxxxxxxx",
          "addr": "xxxxxxxxxxxx",
          "type": "three_phase",
          "vol": 220,
          "key_index": "04"
        }
      ]);
    compareTestingService.initHex();
    $ctrl.saveHexObj([
      {
        id:1,
        filename:'1.hex',
        md5:'d9fc6d737aea3345f681f24c8a2bb07c',
        hex:new ArrayBuffer()
      },
      {
        id:2,
        filename:'2.hex',
        md5:'d9fc6d737aea3345f681f24c8a2bb07d',
        hex:new ArrayBuffer()
      }
    ]);
    $ctrl.renderInitData();
  };

  /**
   * 比对相关
   */


  $ctrl.doCheck = function (item) {
    console.log(item);
    (function () {
      var modalInstance = $uibModal.open({
        animation: $ctrl.animationsEnabled,
        component: 'checkModalComponent',
        resolve: {
          title: function () {
            return '比对信息确认';
          },
          data: function () {
            return compareTestingService.getCompareInfo()
          }
        }
      });

      modalInstance.result.then(function (formObj) {//保存新增

      }, function () {
        // console.info('dismissed at: ' + new Date());
      });
    })();
  };






}

