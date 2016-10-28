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
  var product;
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
}
