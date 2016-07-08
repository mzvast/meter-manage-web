'use strict';

/**
 * @ngdoc function
 * @name manageApp.controller:ActionBeianCompareCtrl
 * @description
 * # ActionBeianCompareCtrl
 * Controller of the manageApp
 */
angular.module('manageApp')
  .controller('ActionBeianCompareCtrl', ['beianManager',function (_beianManager) {
    var vm = this;
    vm.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var all = _beianManager.getAll();
    var product = all.product,
        info = all.info,
        arg = all.arg,
        md5 = all.md5;

    vm.items = {
      product:{
        id:1,
        name:"产品选择",
        prop:product?product.id:'未选择',
        ok:product,
        sref:"action-beian.setProduct",
        data:product
      },
      info:{
        id:2,
        name:"信息录入",
        prop:info?'正常':'未填写',
        ok:info,
        sref:"action-beian.setInfo",
        data:info
      },
      arg:{
        id:3,
        name:"参数配置",
        prop:arg?'正常':'未填写',
        ok:arg,
        sref:"action-beian.setArg",
        data:arg
      },
      hex:{
        id:4,
        name:"暂存HEX文件",
        prop:(md5[0]&&md5[1])?'双核模式':md5[0]?'单核模式':'HEX文件未暂存',
        ok:md5[0]||md5[1],
        sref:"action-beian.setHex",
        data:md5
      }
    };


    vm.isAllSet = false;//vm.setStatus.product&&vm.setStatus.info&&vm.setStatus.arg&&vm.setStatus.hex;

    vm.doCompare = function () {
      _beianManager.getHexLength(0);
    };
  }]);
