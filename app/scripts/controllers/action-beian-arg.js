'use strict';

/**
 * @ngdoc function
 * @name manageApp.controller:ActionBeianArgCtrl
 * @description
 * # ActionBeianArgCtrl
 * Controller of the manageApp
 */
angular.module('manageApp')
  .controller('ActionBeianArgCtrl', ['$stateParams' ,'$state','dataManager','beianManager',function ($stateParams,$state,_dataManager,_beianManager) {
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

    vm.args = function () {
      var args = [],
        i;
      for(i=0;i<8;i++){
          args.push({
            id:i+1,
            on:false,
            num: "111111111111",
            addr:"ffffffffffff",
            type:"单相",
            vol:"220V",
            keyIndex:"04h"
          })
      }
      args[0]['on'] = true;
      return args;
    }();

    vm.changeAll = function () {
      if (vm.args[0].on) {
        vm.args.forEach(function (item) {
          item.on = false;
        })
      } else {
        vm.args.forEach(function (item) {
            item.on = true;
          }
        )
      }
    };

    vm.onSubmit = function () {
      // alert(JSON.stringify(vm.model), null, 2);
      var formatedArgs=[],
          i,
          itemNum = 0,
          checked = true;
      for(i=0;i<vm.args.length;i++){
        if(vm.args[i].on){
          if(!vm.args[i].addr||!vm.args[i].num){
            checked = false;
          }else{
            itemNum++;
            formatedArgs.push({
              id:vm.args[i].id,
              addr:vm.args[i].addr,
              num:vm.args[i].num,
              type:vm.args[i].type,
              vol:vm.args[i].vol
            });
          }

        }
      }
      if(!checked){
        _dataManager.addNotification("warning","参数输入有误，请检查！");
      }else if(!itemNum){
        _dataManager.addNotification("warning","至少输入一组参数！");
      }else{
        if(_beianManager.setArg(formatedArgs)){
          $state.go("action-beian.setHex")
        }else{
          _dataManager.addNotification("danger","设置失败！");
        }
      }
      // $state.go("action-beian.arg");
    };



  }]);
