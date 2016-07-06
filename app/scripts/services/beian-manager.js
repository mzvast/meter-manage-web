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
        log("byteLength:"+hex.byteLength );
      }
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
    vm.unsetAll = function () {
      product=undefined;
      info=undefined;
      arg=undefined;
      hex=undefined;     
    }
  }]);
