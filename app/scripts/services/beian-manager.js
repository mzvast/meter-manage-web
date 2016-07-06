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

    vm.setProduct = function (item) {
      vm.product = item;
      log("product id = "+item.id);
      return true;
    };

    vm.setInfo = function (info) {
      log(JSON.stringify(info));
      return true;
    };

    vm.setArg = function (arg) {
      log(JSON.stringify(arg));
      return true;
    };

    vm.setHex = function () {

    };

    vm.doCompare = function () {

    };

    vm.getReport = function () {

    };
  }]);
