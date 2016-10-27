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

  self.setProduct = function (productObj) {
    product = productObj;
  };

  self.getTitle = function () {
    return product.name;
  };

  self.getProduct = function () {
    return product;
  };

  self.addMcuInfo = function (info) {
    mcu_info.push(info);
  };

  self.setMcuInfo = function (mcu_id,info) {
    mcu_info[mcu_id]=info;
  };

  self.getMcuInfo = function (mcu_id) {
    return mcu_info[mcu_id];
  };

  self.getAllMcuInfo = function () {
    return mcu_info;
  };

  self.clearMcuInfo = function () {
    mcu_info = [];
  };

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
  }

}
