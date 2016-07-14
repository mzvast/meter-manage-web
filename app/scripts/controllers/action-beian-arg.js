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

    vm.options = {
      '220V':220,
      '380v':380
    };
    vm.args = function () {
      var args = [],
        i,j;
      for(i=0;i<8;i++){
          args.push(
            {
              bit:i+1,
              on:false,
              num: "xxxxxxxxxxxx",
              addr:"xxxxxxxxxxxx",
              type:"single_phase",
              vol:220,
              key_index:"04"
            }
          )
      }
      // args[0]['on'] = true;
      var settedArg = _beianManager.getArg();
      if(settedArg){
        for(j=0; j<settedArg.length; j++){
          args.splice((settedArg[j]['bit']-1),1,settedArg[j]);
          args[(settedArg[j]['bit']-1)]['on']=true;
        }
      }

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
            var temp = angular.copy(vm.args[i]);
            delete temp['on'];
            delete temp["$$hashKey"];
            formatedArgs.push(temp);
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
