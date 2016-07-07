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
        hex;

    var ws;

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

    vm.setHex = function (hexFile) {
      if(hexFile instanceof ArrayBuffer) {
        log("true");
        hex = hexFile;
        return true;
      }
        log("false");
      return false;
    };
    vm.getHex = function () {
      return hex;
    };

    vm.getHexLength = function () {
      if(hex instanceof ArrayBuffer){
        var len = hex.byteLength;
        log("byteLength:"+ len);
        return len;
      }
    };
    vm.getMd5 = function () {
      if(hex instanceof ArrayBuffer){
        var md5 = SparkMD5.ArrayBuffer.hash(hex);
        log("md5:"+md5);
        return md5;
      }
    };

    vm.createWS = function(){
      ws = new WebSocket("ws://localhost:3456");
      vm.messages = [];

      ws.onmessage = function(event){
        vm.messages.push(event.data);
      };
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
        hex:hex
      };
    };
    vm.resetAll = function () {
      product=undefined;
      info=undefined;
      arg=undefined;
      hex=undefined;
    }
  }]);
