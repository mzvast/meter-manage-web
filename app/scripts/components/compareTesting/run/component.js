'use strict';
angular.module('manageApp')
  .component('compareTestingRunComponent', {
    templateUrl: 'scripts/components/compareTesting/run/component.html',
    bindings: {},
    controller: compareTestingRunController
  });

compareTestingRunController.$inject = ['pdfService','wsService','$scope','$rootScope','$state','productInfoService','compareTestingService','$uibModal'];

function compareTestingRunController(pdfService,wsService,$scope,$rootScope,$state,productInfoService,compareTestingService,$uibModal)
{
  var $ctrl = this;
  $ctrl.timelineMsg = [];

  $ctrl.$onInit = function () {
    $ctrl.title = compareTestingService.getTitle();
    $ctrl.productInfo = compareTestingService.getProduct();
    $ctrl.productDetail = compareTestingService.getProductDetail();
    $ctrl.mcuInfo = compareTestingService.getAllMcuInfo();
    $ctrl.getResult = function () {
      return wsService.getResult();
    };
    $ctrl.getRecordNum = function () {
      return compareTestingService.getRecordNum();
    };
    $ctrl.getCompareNum = function () {
      return compareTestingService.getCompareNum();
    };
    $ctrl.getMode = function () {
      return wsService.getMode();
    };
    wsService.testMessage();

    $ctrl.activeTabId = 0;
    $ctrl.tabModel = [{
      id:0,
      name:'比对执行中'
    }];

    $ctrl.date = function () {
      var Today=new Date();
      var todayStr = Today.getFullYear()+ " 年 " + (Today.getMonth()+1) + " 月 " + Today.getDate() + " 日";
      // console.log(todayStr);
      return todayStr;
    }();

    $ctrl.run();//进入即开始测试
  };

  $ctrl.options = [
    {
      name: "读取模式",
      action: "getMode"
    },
    {
      name: "模式设置0单步运行",
      action: "setMode0"
    },
    {
      name: "模式设置1备案比对",
      action: "setMode1"
    },
    {
      name: "模式设置2供货比对",
      action: "setMode2"
    }, {
      name: "0.测试本地消息",
      action: "addTimelineMsg"
    }, {
      name: "1.建立连接",
      action: "wsCreate"
    }, {
      name: "2.发送比对信息",
      action: "sendInfo"
    }, {
      name: "3.发送hex文件CPU1",
      action: "sendHex0"
    }, {
      name: "4.发送hex文件CPU2",
      action: "sendHex1"
    }, {
      name: "5.发送比对开始指令",
      action: "sendStartCompare"
    }, {
      name: "6.发送备案号",
      action: "sendRecordNum"
    }, {
      name: "7.结束比对",
      action: "stopCompare"
    }, {
      name: "8.1 设置比对结果:成功",
      action: "setResultTrue"
    }, {
      name: "8.2 设置比对结果:失败",
      action: "setResultFalse"
    }, {
      name: "9. 查看比对报告结果",
      action: "goReport"
    }, {
      name: "清除时间线消息",
      action: "clearMessage"
    }, {
      name: "查看infoMsg",
      action: "getInfoMsg"
    },{
      name: "post比对结果并获取编号",
      action: "postResult"
    }
  ];
  $ctrl.run = function () {
    console.log('run!');
    $ctrl.wsCreate();
  };

  $ctrl.wsCreate = function () {
    wsService.wsCreate('ws://localhost:3456',function () {
      $ctrl.postResult(function () {
        $ctrl.goReport();
      });
    });
  };

  $ctrl.addTimelineMsg = function () {
    wsService.addMessage(
      {
        direction: "in",
        type: "success",
        time: Date.now(),
        event: "测试消息"
      })
  };

  $ctrl.setMode1 = function () {
    wsService.setMode(1);
  };
  $ctrl.setMode2 = function () {
    wsService.setMode(2);
  };
  $ctrl.setMode0 = function () {
    wsService.setMode(0);
  };
  $ctrl.getMode = function () {
    console.log("当前mode:" + wsService.getMode());
  };

  $ctrl.sendInfo = function () {
    wsService.wsSendInfoMsg();
  };

  $ctrl.sendHex0 = function () {
    wsService.wsSendHex(0);
  };

  $ctrl.sendHex1 = function () {
    wsService.wsSendHex(1);
  };

  $ctrl.sendRecordNum = function () {
    wsService.wsSendRecordNum('12345');//TODO
  };

  $ctrl.sendStartCompare = function () {
    wsService.wsSendStartCompare();
  };

  $ctrl.stopCompare = function () {
    $ctrl.start = false;
    wsService.wsClose();
  };

  $ctrl.setResultTrue = function () {
    wsService.setResult(true);
  };

  $ctrl.setResultFalse = function () {
    wsService.setResult(false);
  };

  $ctrl.clearMessage = function () {
    wsService.clearMessage();
  };

  $ctrl.goReport = function () {
    $ctrl.tabModel = [{
      id:1,
      name:'比对报告'
    }];
    $ctrl.selectTab(1);
    // $state.go('action-beian.report');TODO
  };

  $ctrl.getInfoMsg = function () {
    console.log(wsService.getInfoObj());
  };


  $ctrl.selectTab = function(id){
    $ctrl.activeTabId = id;
  };

  wsService.subscribe($scope,function () {
    $ctrl.timelineMsg = wsService.getMessage();
  });


  $ctrl.makePdf = function () {
    pdfService.getFileUrl({
      productInfo:$ctrl.productInfo,
      productDetail:$ctrl.productDetail,
      mcuInfo:$ctrl.mcuInfo,
      date:$ctrl.date,
      result:wsService.getResult(),
      mode:wsService.getMode()
    },function (fileURL) {
      window.open(fileURL);
    });
  };

  $ctrl.postResult = function (cb) {
    console.log('post result');
    compareTestingService
      .postResult(
        {
          compare_result:$ctrl.getResult()?'sucess':'fail',
          compare_type:wsService.getMode()?'record':'supply'
        },$ctrl.productInfo.id,
        function (res) {
          console.log(res);
          compareTestingService.setRecordNum(res.data.record_num);
          compareTestingService.setCompareNum(res.data.compare_num);
          cb();
    });
  };

  $ctrl.finish = function () {
    $state.go('compare',{},{reload:true});
  }













}

