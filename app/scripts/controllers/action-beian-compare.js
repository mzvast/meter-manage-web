'use strict';

/**
 * @ngdoc function
 * @name manageApp.controller:ActionBeianCompareCtrl
 * @description
 * # ActionBeianCompareCtrl
 * Controller of the manageApp
 */
angular.module('manageApp')
  .controller('ActionBeianCompareCtrl', ['$scope','beianManager',function ($scope,_beianManager) {
    var vm = this;
    vm.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.service = _beianManager;

    vm.opModel = [
      {
        name:"刷新timeline",
        action:"refreshTimeline"
      },{
       name:"建立连接",
        action:"wsCreate"
      },{
        name:"增加测试消息",
        action:"addTimelineMsg"
      },{
        name:"发送比对信息",
        action:"sendInfo"
      },{
        name:"发送hex文件CPU1",
        action:"sendHex0"
      },{
        name:"发送hex文件CPU2",
        action:"sendHex1"
      },{
        name:"发送比对开始指令",
        action:"sendStartCompare"
      }
    ];

    var all,
        product,
        info,
        arg,
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
          prop:product? '['+product.supplier+']公司第['+ product.batch+ ']批次['+product.name+']产品':'未选择',
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
      vm.isAllSet = product&&info&&arg&&md5;
    };

    refresh();//init when load



    vm.doCompare = function () {
      _beianManager.getHexLength(0);
    };

    vm.fake = function () {
      _beianManager.fakeData();
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

    vm.sendStartCompare = function () {
      _beianManager.wsSendStartCompare();
    };

    vm.refreshTimeline = function () {
      vm.timelineMsg = _beianManager.getTimelineMsg();
    };

    $scope.$watch('service.getTimelineMsg()', function(newVal) {
      console.log(" New Data", newVal);
      vm.timelineMsg =newVal;
    });
 

    // vm.timelineMsg = [{
    //   direction:"out",
    //   type:"success",
    //   time:"5 mins ago",
    //   event:"WebSocket连接成功"
    // },{
    //   direction:"in",
    //   type:"fail",
    //   time:Date.now(),
    //   event:"WebSocket连接失败"
    // },{
    //   direction:"out",
    //   type:"success",
    //   time:"4 mins ago",
    //   event:"发送比对信息"
    // },{
    //   direction:"in",
    //   type:"success",
    //   time:"4 mins ago",
    //   event:"比对信息发送成功"
    // },{
    //   direction:"in",
    //   type:"fail",
    //   time:Date.now(),
    //   event:"比对信息发送失败"
    // },{
    //   direction:"out",
    //   type:"success",
    //   time:"3 mins ago",
    //   event:"发送HEX文件"
    // },{
    //   direction:"in",
    //   type:"success",
    //   time:"3 mins ago",
    //   event:"上一个HEX文件发送成功,准备发送下一个"
    // },{
    //   direction:"in",
    //   type:"fail",
    //   time:"3 mins ago",
    //   event:"HEX文件发送失败"
    // },{
    //   direction:"out",
    //   type:"success",
    //   time:"2 mins ago",
    //   event:"发送开始比对命令"
    // },{
    //   direction:"in",
    //   type:"success",
    //   time:"2 mins ago",
    //   event:"比对开始"
    // },{
    //   direction:"in",
    //   type:"fail",
    //   time:Date.now(),
    //   event:"比对开始失败"
    // },
    //   {
    //     direction:"in-final",
    //     type:"success",
    //     time:"1 mins ago",
    //     event:"比对成功"
    //   },{
    //     direction:"in-final",
    //     type:"fail",
    //     time:Date.now(),
    //     event:"["+[1,2]+"]表位比对失败"
    //   }]
  }]);
