'use strict';

/**
 * @ngdoc function
 * @name manageApp.controller:ActionBeianCompareCtrl
 * @description
 * # ActionBeianCompareCtrl
 * Controller of the manageApp
 */
angular.module('manageApp')
  .controller('ActionBeianCompareCtrl', ['$scope','beianManager','$state','$interval',function ($scope,_beianManager,$state,$interval) {
    var vm = this;
    vm.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    vm.setMode1 = function () {
      _beianManager.setMode(1);
    };
    vm.setMode2 = function () {
      _beianManager.setMode(2);
    };
    vm.setMode0 = function () {
      _beianManager.setMode(0);
    };
    vm.getMode = function () {
      console.log("当前mode:"+_beianManager.getMode());
    };

    vm.mode = _beianManager.getMode();


    $scope.service = _beianManager;

    vm.opModel = [
      {
        name:"读取模式",
        action:"getMode"
      },
      {
        name:"模式设置0单步运行",
        action:"setMode0"
      },
      {
        name:"模式设置1备案比对",
        action:"setMode1"
      },
      {
        name:"模式设置2供货比对",
        action:"setMode2"
      },{
        name:"0.测试本地消息",
        action:"addTimelineMsg"
      },{
       name:"1.建立连接",
        action:"wsCreate"
      },{
        name:"2.发送比对信息",
        action:"sendInfo"
      },{
        name:"3.发送hex文件CPU1",
        action:"sendHex0"
      },{
        name:"4.发送hex文件CPU2",
        action:"sendHex1"
      },{
        name:"5.发送比对开始指令",
        action:"sendStartCompare"
      },{
        name:"6.发送备案号",
        action:"sendRecordNum"
      },{
        name:"7.结束比对",
        action:"stopCompare"
      },{
        name:"8.1 设置比对结果:成功",
        action:"setResultTrue"
      },{
        name:"8.2 设置比对结果:失败",
        action:"setResultFalse"
      },{
        name:"9. 查看比对报告结果",
        action:"goReport"
      },{
        name:"清除时间线消息",
        action:"clearTimelineMsg"
      },{
        name:"查看infoMsg",
        action:"getInfoMsg"
      }
    ];

    var all,
        product,
        info,
        arg,
      compareresults,
        md5;

    var refresh = function () {
      all = _beianManager.getAll();
      product = all.product;
      info = all.info;
      arg = all.arg;
      md5 = all.md5;

      vm.items = {
        product:{
          id:1,
          name:"产品选择",
          prop:product? '['+product.vendor+']公司第['+ product.batch+ ']批次['+product.name+']产品':'未选择',
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
      vm.isAllSet = _beianManager.isAllSet();
    };

    refresh();//init when load



    vm.doCompare = function () {
      _beianManager.getHexLength(0);
    };

    vm.fake = function () {
      _beianManager.fakeDataDemo();
      refresh();
    };

    vm.timelineMsg = [];

    vm.wsCreate = function () {
      _beianManager.wsCreate('ws://localhost:3456');
    };

    vm.addTimelineMsg = function () {
      _beianManager.addTimelineMsg(
        {direction:"in",
        type:"success",
        time:Date.now(),
        event:"测试消息"})
    };

    vm.sendInfo = function () {
      _beianManager.wsSendInfoMsg();
    };

    vm.sendHex0 = function () {
      _beianManager.wsSendHex(0);
    };

    vm.sendHex1 = function () {
      _beianManager.wsSendHex(1);
    };

    vm.sendRecordNum = function () {
      _beianManager.wsSendRecordNum();
    };

    vm.sendStartCompare = function () {
      _beianManager.wsSendStartCompare();
    };

    vm.stopCompare = function () {
      vm.start = false;
      _beianManager.wsClose();
    };

    vm.setResultTrue = function () {
      _beianManager.setResult(true);
    };

    vm.setResultFalse = function () {
      _beianManager.setResult(false);
    };

    vm.clearTimelineMsg = function () {
      _beianManager.clearTimelineMsg();
    };

    vm.goReport = function () {
      $state.go('action-beian.report');
    };

    vm.getInfoMsg = function () {
      vm.showInfoMsg = true;
      vm.infoMsg = _beianManager.getInfoMsg();
      console.log(vm.showInfoMsg);
      console.log(vm.infoMsg);
    };

    $scope.$watch('service.getTimelineMsg()', function(newVal) {
      // console.log(" New Data", newVal);
      vm.timelineMsg =newVal;
    });

    //provalue更新
    $scope.$watch('service.getProgress()',function (newVal) {
      vm.provalue = newVal;
    });

    vm.startCompare = function () {
      vm.start = true;
      if(vm.mode===0){
        return;
      }
        vm.wsCreate();
    };


    vm.style = 'progress-bar-danger';
    vm.showLabel = true;
    vm.striped = true;
    var index = 0;
    var timeId = 100;
    $scope.count = function(){
      var start = $interval(function(){
          index = index + 20;
          vm.provalue = index;
          // console.log(vm.provalue);
          if (index > 99) {
            $interval.cancel(start);
          }
        //$scope.$apply();
      }, timeId);
    };

  }]);
