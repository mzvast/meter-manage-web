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
    vm.onSubmit = function () {
      // alert(JSON.stringify(vm.model), null, 2);
      if(_beianManager.setInfo(vm.model)){
        $state.go("action-beian.setArg");
      }else{
        _dataManager.addNotification("danger","设置失败！");
      }
    };


    vm.fields = _formManager.getForm('info', vm);
    vm.model = {
      "protect_addr":[{},{}],
      "reserve_addr": [{},{}]
    }
  }]);
