'use strict';

/**
 * @ngdoc service
 * @name manageApp.compareTestingService
 * @description
 * # compareTestingService
 * Service in the manageApp.
 */
angular.module('manageApp')
  .service('compareTestingService', compareTestingService);

compareTestingService.$inject = [];

function compareTestingService() {
  var self = this;

  var mcu_info = [];
  var product,recordNum;
  self.args =[
    {
      "bit": 1,
      "on": false,
      "num": "xxxxxxxxxxxx",
      "addr": "xxxxxxxxxxxx",
      "type": "single_phase",
      "vol": 220,
      "key_index": "04"
    },
    {
      "bit": 2,
      "on": false,
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
  ];

  var hexObj = [];//id,md5,filename

  var core_num = 0;
  var formModel = [
    'costcontrol_type',
    'i_spec',
    'program_for_meter',
    'program_type',
    'program_version',
    'report_num',
    'v_spec'
  ];
  var form = {};

  /**
   * Product
   * @param productObj
   */

  self.setProduct = function (productObj) {
    product = productObj;
  };

  self.getTitle = function () {
    return product.name;
  };

  self.getProduct = function () {
    return product;
  };

  /**
   * MCU info
   * @param info
   */

  self.addMcuInfo = function (info) {
    core_num++;
    mcu_info.push(info);
  };

  self.removeMcuInfo = function (index) {
    core_num--;
    mcu_info.splice(index, 1);
  };

  self.setMcuInfo = function (mcu_id,info) {
    console.log('got info in service',info);
    mcu_info=mcu_info.map(function (item) {
      if(item.mcu_id === info.mcu_id) return info;
      return item;
    })
  };

  self.getMcuInfo = function (mcu_id) {
    return mcu_info[mcu_id-1];//angular.toJson();去除$$hashKey
  };

  self.getAllMcuInfo = function () {
    return mcu_info;
  };

  self.clearMcuInfo = function () {
    mcu_info = [];
    core_num = 0;
  };

  /**
   * core numbers
   * @returns {number}
   */

  self.getCoreNum = function () {
    return core_num;
  };

  self.addCore = function () {
    var new_id = core_num+1;
    self.addMcuInfo({mcu_id:new_id});
  };

  self.removeCore = function (index) {
    if(core_num<=1) return;
    self.removeMcuInfo(index);
  };

  /**
   * init data
   * @param formObj
   */

  self.setForm = function (formObj) {
    form = formObj;
  };

  self.getForm = function () {
    return form;
  };

  self.initData = function (responseData) {
    self.fakeData();return;//debug purpose

    self.clearMcuInfo();
    if(responseData.mcu_info){
      responseData.mcu_info.map(function (item) {
        self.addMcuInfo(item);
      })
    }
    formModel.map(function (item) {
      form[item] = responseData[item]||'未定义';
    })
  };

  /**
   * HEX
   */
  self.initHex = function () {
    hexObj = [];
    for(var i=1;i<=core_num;i++){
      hexObj.push({
        id:i,
        filename:'未选择',
        md5:'未选择',
        hex:undefined
      })
    }
    console.log('init hexObj',self.hexObj);
  };

  self.setHex = function (id,filename,md5,hex) {
    hexObj = hexObj.map(function (item) {
      if(item.id===id) {
        return {
          id:id,
          filename:filename,
          md5:md5,
          hex:hex
          }
        }
        return item;

    })
  };

  self.getAllHex = function () {
    return hexObj;
  };

  /**
   * 生成模拟数据（含md5）
   */
  self.fakeData = function () {

    core_num = 2;

    self.initHex();
    self.setHex(1,'1.hex','d9fc6d737aea3345f681f24c8a2bb07c',new ArrayBuffer());
    self.setHex(2,'2.hex','d9fc6d737aea3345f681f24c8a2bb07d',new ArrayBuffer());

    // hex[0] = new ArrayBuffer();
    // hex[1] = new ArrayBuffer();

    recordNum = 1234567890123456;

    form = {
      'costcontrol_type':'em_esam',
      'i_spec':'5(60)A',
      'v_spec':'220V',
      'program_for_meter':'0.2s级三相智能电能表',
      'program_type':'normal',
      'program_version':'V 2.0',
      'report_num':'模拟数据'
    };

    // md5[0] = 'd9fc6d737aea3345f681f24c8a2bb07c';
    // md5[1] = 'd9fc6d737aea3345f681f24c8a2bb07d';
    // filename[0] = '0.hex';
    // filename[1] = '1.hex';

    mcu_info = [
      {
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
    },
      {
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
    }];

    product = {
      "company_name": "XXXXXXXX有限公司",
      "meter_name": "XXXX",
      "company_code": "0020",
      "meter_model": "DDSF001-M",
      "v_spec": "220V",
      "i_spec": "5(60)A",
      "costcontrol_type": "em_esam",
      "program_version": "V 1.0",
      "program_type": "normal",
      "program_for_meter": "0.2s级三相智能电能表"
    };

    self.args = [
      {
      "bit": 1,
      "on": true,
      "num": "xxxxxxxxxxxx",
      "addr": "xxxxxxxxxxxx",
      "type": "single_phase",
      "vol": 220,
      "key_index": "04"
    },{
      "bit": 2,
      "on": true,
      "num": "xxxxxxxxxxxx",
      "addr": "xxxxxxxxxxxx",
      "type": "single_phase",
      "vol": 220,
      "key_index": "04"
    }];

  };
}
