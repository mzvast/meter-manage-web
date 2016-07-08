'use strict';

/**
 * @ngdoc service
 * @name manageApp.beianManager
 * @description
 * # beianManager
 * Service in the manageApp.
 */
angular.module('manageApp')
  .service('beianManager', ['dataManager',function (_dataManager) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var vm = this;
    ////////////
    // 配置调试 //
    ////////////
    var log = _dataManager.log();
    var product,
        info,
        arg,
        hex = [],
        md5 = [];

    var ws,infoMsg;

    vm.setProduct = function (item) {
      product = item;
      log("product id = "+item.id);
      return true;
    };
    vm.getProduct = function () {
      return product;
    };

    vm.setInfo = function (item) {
      info = item;
      log(JSON.stringify(item));
      return true;
    };
    vm.getInfo = function () {
      return info;
    };

    vm.setArg = function (item) {
      arg = item;
      log(JSON.stringify(item));
      return true;
    };
    vm.getArg = function () {
      return arg;
    };

    vm.setHex = function (hexFile,index) {
      if(hexFile instanceof ArrayBuffer) {
        log("true");
        hex[index]=hexFile;
        md5[index] = SparkMD5.ArrayBuffer.hash(hex[index]);
        return true;
      }
        log("false");
      return false;
    };
    vm.getHex = function (index) {
      if(hex[index]){
        return hex[index];
      }
    };

    vm.getHexLength = function (index) {
      if(hex[index]&&(hex[index] instanceof ArrayBuffer)){
        var len = hex[index].byteLength;
        log("byteLength:"+ len);
        return len;
      }
    };
    vm.getMd5 = function (index) {
      if(md5[index]){
        log(md5[index]);
        return md5[index];
      }
    };

    vm.wsCreate = function(url){
      if(!url) return;
      ws = new WebSocket(url);
      vm.messages = [];

      ws.onmessage = function(event){
        vm.messages.push(event);
      };
    };

    vm.wsSend = function (msg) {
      ws.send(msg);
    };

    var makeInfoMsg = function () {
      infoMsg = {
        type:'info',
        data:{
          file_info:[],
          cpu_info:[],
          meter_info:[]
        }
      };

      infoMsg.data.file_info.push({
          cpu_id:1,
          md5:md5[0]
        });
      infoMsg.data.cpu_info.push(info.cpu_info);
      infoMsg.data.cpu_info[0]['cpu_id'] = 1;
      infoMsg.data.meter_info.push(arg[0]);
      infoMsg.data.meter_info[0]['costcontrol_type']=info.costcontrol_type;
    };

    vm.wsSendInfoMsg = function () {
      makeInfoMsg();
      ws.send(infoMsg);
    };

    vm.doCompare = function () {

    };

    vm.getReport = function () {

    };

    vm.getAll = function () {
      return {
        product:product,
        info:info,
        arg:arg,
        md5:md5
      };
    };
    vm.resetAll = function () {
      product=undefined;
      info=undefined;
      arg=undefined;
      hex=undefined;
    };

    vm.fakeData = function () {
      md5[0]='d9fc6d737aea3345f681f24c8a2bb07c';

      info = {
        "cpu_info": {
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
              "end": "133ffh"
            }
          ],
          "memory_addr": {
            "start": "4000",
            "end": "13fff"
          },
          "code_addr": {
            "start": "4000",
            "end": "97fff"
          }
        },
        "company_name": "XXXXXXXX有限公司",
        "meter_name": "XXXX",
        "company_code": "0020",
        "meter_model": "DDSF001-M",
        "v_spec": "220V",
        "i_spec": "5(60)A",
        "costcontrol_type": "em_esam",
        "mcu_model": "瑞萨电子R5F212B8",
        "program_version": "V 1.0",
        "program_type": "normal",
        "program_for_meter": "0.2s级三相智能电能表"
      };

      arg = [{
        "bit":1,
        "num":"xxxxxxxxxxxx",
        "addr":"xxxxxxxxxxxx",
        "type":"single_phase",
        "vol":"220",
        "key_index":"04h"
      }];



    }
  }]);
