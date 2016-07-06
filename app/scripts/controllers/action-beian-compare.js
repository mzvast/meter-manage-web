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

    vm.setStatus = _beianManager.getAll();
    vm.isAllSet = vm.setStatus.product&&vm.setStatus.info&&vm.setStatus.arg&&vm.setStatus.hex;

    vm.hexLength = vm.setStatus.hex?vm.setStatus.hex.byteLength:undefined;

    vm.doCompare = function () {
      _beianManager.getHexLength();
    };
  }]);
