'use strict';

/**
 * @ngdoc function
 * @name manageApp.controller:ActionBeianInfoCtrl
 * @description
 * # ActionBeianInfoCtrl
 * Controller of the manageApp
 */
angular.module('manageApp')
  .controller('ActionBeianInfoCtrl', ['formManager', '$stateParams' ,'$state','dataManager','beianManager',function (_formManager, $stateParams,$state,_dataManager,_beianManager) {
    var vm = this;
    vm.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    ////////////
    // 配置调试 //
    ////////////
    var log = _dataManager.log();
    vm.onSubmit = function () {
      // alert(JSON.stringify(vm.model), null, 2);
      _beianManager.setInfo(vm.model);
      $state.go("action-beian.arg");
    };


    vm.fields = _formManager.getForm('apply', vm);

  }]);
