'use strict';

describe('Service: beianManager', function () {

  // load the service's module
  beforeEach(window.angular.mock.module('manageApp', function($urlRouterProvider, $httpProvider) {
    $urlRouterProvider.deferIntercept(); //延迟url改变，保持当前state，避免报错
    $httpProvider.interceptors.pop(); //移除RAP拦截器，使得$httpBackend可以正常拦截
  }));

  // instantiate service
  var beianManager,
      Server = require('mock-socket').Server;
  beforeEach(inject(function (_beianManager_) {
    beianManager = _beianManager_;
  }));

  it('should do something', function () {
    expect(!!beianManager).toBe(true);
  });

  it('wsCreate 创建 Websocket',function (done) {
    var mockServer = new Server('ws://localhost:3456');
    mockServer.on('connection',function (){
      mockServer.send(JSON.stringify({msg:'test message 1'}));
      mockServer.send(JSON.stringify({msg:'test message 2'}));
    });
    beianManager.wsCreate('ws://localhost:3456');
    setTimeout(
      function () {
        var msg = beianManager.getMessage();
        var timelineMsg = beianManager.getTimelineMsg();
        expect(msg.length===2).toBe(true);
        expect(timelineMsg.length===1).toBe(true);
        mockServer.stop();
        done();
      },100);
  });

  it('wsSend',function (done) {
    var mockServer = new Server('ws://localhost:3456');
    var serverMsg =[];
    mockServer.on('message',function (e){
      serverMsg.push(JSON.parse(e));
    });
    beianManager.wsCreate('ws://localhost:3456');
    beianManager.wsSend('hello Server!');
    beianManager.wsSend('hello Server2!');
    setTimeout(
      function () {
        expect(serverMsg.length===2).toBe(true);
        mockServer.stop();
        done();
      },100);
  });

  it('wsSendInfoMsg发送比对信息',function (done) {
    var mockServer = new Server('ws://localhost:3456');
    var serverMsg =[];
    mockServer.on('message',function (e){
      serverMsg.push(JSON.parse(e));
    });
    beianManager.fakeData();//伪造数据
    beianManager.wsCreate('ws://localhost:3456');
    beianManager.wsSendInfoMsg();
    /**
     * 测试用例：期望比对信息
     * @type {{type: string, data: {file_info: *[], cpu_info: *[], meter_info: *[]}}}
     */
    var expectData = {
      "type": "info",
      "data": {
        "file_info": [
          {
            "cpu_id": 1,
            "md5": "d9fc6d737aea3345f681f24c8a2bb07c"
          },
          {
            "cpu_id": 2,
            "md5": "d9fc6d737aea3345f681f24c8a2bb07d"
          }
        ],
        "cpu_info": [
          {
            "cpu_id": 1,
            "memory_addr": {
              "start": "4000",
              "end": "13fff"
            },
            "code_addr": {
              "start": "4000",
              "end": "97ff"
            },
            "protect_addr": [
              {
                "start": "12000",
                "end": "121ff"
              },
              {
                "start": "13000",
                "end": "133ff"
              }
            ],
            "reserve_addr": [
              {
                "start": "12000",
                "end": "121ff"
              },
              {
                "start": "13000",
                "end": "133ff"
              }
            ]
          },
          {
            "cpu_id": 2,
            "memory_addr": {
              "start": "4000",
              "end": "13fff"
            },
            "code_addr": {
              "start": "4000",
              "end": "97ff"
            },
            "protect_addr": [
              {
                "start": "12000",
                "end": "121ff"
              },
              {
                "start": "13000",
                "end": "133ff"
              }
            ],
            "reserve_addr": [
              {
                "start": "12000",
                "end": "121ff"
              },
              {
                "start": "13000",
                "end": "133ff"
              }
            ]
          }
        ],
        "meter_info": [{
          "bit": 1,
          "type": "single_phase",
          "costcontrol_type": "em_esam",
          "num": "xxxxxxxxxxxx",
          "addr": "xxxxxxxxxxxx",
          "vol": 220,
          "key_index": "04"
        },{
          "bit": 2,
          "type": "single_phase",
          "costcontrol_type": "em_esam",
          "num": "xxxxxxxxxxxx",
          "addr": "xxxxxxxxxxxx",
          "vol": 220,
          "key_index": "04"
        }]
      }
    };
    setTimeout(
      function () {

        expect(serverMsg[0]['type']).toEqual(expectData['type']);

        expect(serverMsg[0]['data']['meter_info']).toEqual(expectData['data']['meter_info']);

        expect(serverMsg[0]['data']['file_info']).toEqual(expectData['data']['file_info']);

        expect(serverMsg[0]['data']['cpu_info'][0]['protect_addr']).toEqual(expectData['data']['cpu_info'][0]['protect_addr']);

        expect(serverMsg[0]['data']['cpu_info'][0]['reserve_addr']).toEqual(expectData['data']['cpu_info'][0]['reserve_addr']);

        expect(serverMsg[0]['data']['cpu_info'][0]['memory_addr']).toEqual(expectData['data']['cpu_info'][0]['memory_addr']);

        expect(serverMsg[0]['data']['cpu_info'][0]['code_addr']).toEqual(expectData['data']['cpu_info'][0]['code_addr']);

        expect(serverMsg[0]['data']['cpu_info'][0]['cpu_id']).toEqual(expectData['data']['cpu_info'][0]['cpu_id']);

        expect(serverMsg[0]['data']['cpu_info'][1]['md5']).toEqual(expectData['data']['cpu_info'][1]['md5']);

        // expect(serverMsg[0]).toEqual(expectData);
        mockServer.stop();
        done();
      },100);
  });



  it('addTimelineMsg时间线消息', function () {
    beianManager.addTimelineMsg({
      direction:"out",
      type:"success",
      time:"5 mins ago",
      event:"建立WebSocket连接"
    });
    var timelineMsg = beianManager.getTimelineMsg();
    expect(timelineMsg.length).toEqual(1);
    expect(timelineMsg[0]).toEqual({
      direction:"out",
      type:"success",
      time:"5 mins ago",
      event:"建立WebSocket连接"
    });
  });

  it('ws 发送比对信息回复success',function (done) {
    var mockServer = new Server('ws://localhost:3456');
    var serverMsg =[];
    mockServer.on('message',function (e){
      serverMsg.push(JSON.parse(e));
      if(JSON.parse(e).type==='info'){
        mockServer.send(JSON.stringify({
          "type": "info",
          "state": "success"
        })) ;
      }
    });
    beianManager.fakeData();//伪造数据
    beianManager.wsCreate('ws://localhost:3456');
    beianManager.wsSendInfoMsg();
    setTimeout(
      function () {
        var timelineMsg = beianManager.getTimelineMsg();
        // console.log(timelineMsg);
        // console.log(serverMsg);
        expect(timelineMsg[2]['event']).toEqual("比对信息发送成功");
        mockServer.stop();
        done();
      },100);
  });

  it('ws 发送比对信息回复fail',function (done) {
    var mockServer = new Server('ws://localhost:3456');
    var serverMsg =[];
    mockServer.on('message',function (e){
      serverMsg.push(JSON.parse(e));
      if(JSON.parse(e).type==='info'){
        mockServer.send(JSON.stringify({
          "type": "info",
          "state": "fail",
          "reason":"hehe"
        })) ;
      }
    });
    beianManager.fakeData();//伪造数据
    beianManager.wsCreate('ws://localhost:3456');
    beianManager.wsSendInfoMsg();
    setTimeout(
      function () {
        var timelineMsg = beianManager.getTimelineMsg();
        // console.log(timelineMsg);
        // console.log(serverMsg);
        expect(timelineMsg[2]['event']).toEqual("比对信息发送失败，原因hehe");
        mockServer.stop();
        done();
      },100);
  });

  it('ws 发送 hex文件 回复next',function (done) {
    var mockServer = new Server('ws://localhost:3456');
    var serverMsg =[];
    mockServer.on('message',function (e){
      serverMsg.push(e);
        mockServer.send(JSON.stringify({
          "type": "file",
          "state": "next"
        }));
    });
    beianManager.fakeData();//伪造数据
    beianManager.wsCreate('ws://localhost:3456');
    beianManager.wsSendHex();
    setTimeout(
      function () {
        var timelineMsg = beianManager.getTimelineMsg();
        // console.log(timelineMsg);
        // console.log(serverMsg);
        expect(timelineMsg[2]['event']).toEqual("上一个HEX文件发送成功,准备发送下一个");
        mockServer.stop();
        done();
      },100);
  });

  it('ws 发送 hex文件 回复success',function (done) {
    var mockServer = new Server('ws://localhost:3456');
    var serverMsg =[];
    mockServer.on('message',function (e){
      serverMsg.push(e);
      mockServer.send(JSON.stringify({
        "type": "file",
        "state": "success"
      }));
    });
    beianManager.fakeData();//伪造数据
    beianManager.wsCreate('ws://localhost:3456');
    beianManager.wsSendHex();
    setTimeout(
      function () {
        var timelineMsg = beianManager.getTimelineMsg();
        // console.log(timelineMsg);
        // console.log(serverMsg);
        expect(timelineMsg[2]['event']).toEqual("HEX文件全部发送成功");
        mockServer.stop();
        done();
      },100);
  });

  it('ws 发送 hex文件 回复fail',function (done) {
    var mockServer = new Server('ws://localhost:3456');
    var serverMsg =[];
    mockServer.on('message',function (e){
      serverMsg.push(e);
      mockServer.send(JSON.stringify({
        "type": "file",
        "state": "fail",
        "reason":"hehe"
      }));
    });
    beianManager.fakeData();//伪造数据
    beianManager.wsCreate('ws://localhost:3456');
    beianManager.wsSendHex();
    setTimeout(
      function () {
        var timelineMsg = beianManager.getTimelineMsg();
        // console.log(timelineMsg);
        // console.log(serverMsg);
        expect(timelineMsg[2]['event']).toEqual("HEX文件发送失败，原因hehe");
        mockServer.stop();
        done();
      },100);
  });

  it('ws 发送备案号 回复success',function (done) {
    var mockServer = new Server('ws://localhost:3456');
    var serverMsg =[];
    mockServer.on('message',function (e){
      serverMsg.push(JSON.parse(e));
      if(JSON.parse(e).type==="record_num"){
        mockServer.send(JSON.stringify({
          "type": "record_num",
          "state": "success"
        }));
      }
    });
    beianManager.fakeData();//伪造数据
    beianManager.wsCreate('ws://localhost:3456');
    beianManager.setRecordNum(1234567890123456);
    beianManager.wsSendRecordNum();

    setTimeout(
      function () {
        var timelineMsg = beianManager.getTimelineMsg();
        expect(serverMsg[0]['type']).toEqual("record_num");
        expect(serverMsg[0]['value']).toEqual(1234567890123456);
        expect(timelineMsg[2]['event']).toEqual("备案号发送成功");
        mockServer.stop();
        done();
      },100);
  });

  it('ws 发送备案号 回复fail',function (done) {
    var mockServer = new Server('ws://localhost:3456');
    var serverMsg =[];
    mockServer.on('message',function (e){
      serverMsg.push(JSON.parse(e));
      if(JSON.parse(e).type==="record_num"){
        mockServer.send(JSON.stringify({
          "type": "record_num",
          "state": "fail",
          "reason":"hehe"
        }))
      }
    });
    beianManager.fakeData();//伪造数据
    beianManager.wsCreate('ws://localhost:3456');
    beianManager.setRecordNum(1234567890123456);
    beianManager.wsSendRecordNum();

    setTimeout(
      function () {
        var timelineMsg = beianManager.getTimelineMsg();
        expect(serverMsg[0]['type']).toEqual("record_num");
        expect(serverMsg[0]['value']).toEqual(1234567890123456);
        expect(timelineMsg[2]['event']).toEqual("备案号发送失败，原因hehe");
        mockServer.stop();
        done();
      },100);
  });

  it('ws 发送开始比对命令 回复success',function (done) {
    var mockServer = new Server('ws://localhost:3456');
    var serverMsg =[];
    mockServer.on('message',function (e){
      serverMsg.push(JSON.parse(e));
      if(JSON.parse(e).type==="start_compare"){
        mockServer.send(JSON.stringify({
          "type": "start_compare",
          "state": "success"
        }))
      }
    });
    beianManager.fakeData();//伪造数据
    beianManager.wsCreate('ws://localhost:3456');
    beianManager.wsSendStartCompare();
    /**
     * 测试用例：期望开始比对命令
     * @type {{type: string, bit: number[]}}
     */
    var expectStartData = {
      "type": "start_compare",
      "bit":[1,2]
    };
    setTimeout(
      function () {
        var timelineMsg = beianManager.getTimelineMsg();
        expect(serverMsg[0]['type']).toEqual(expectStartData['type']);
        expect(serverMsg[0]['data']).toEqual(expectStartData['data']);
        expect(timelineMsg[2]['event']).toEqual("比对开始");
        mockServer.stop();
        done();
      },100);
  });

  it('ws 发送开始比对命令 回复fail',function (done) {
    var mockServer = new Server('ws://localhost:3456');
    var serverMsg =[];
    mockServer.on('message',function (e){
      serverMsg.push(JSON.parse(e));
      if(JSON.parse(e).type==="start_compare"){
        mockServer.send(JSON.stringify({
          "type": "start_compare",
          "state": "fail",
          "reason":"hehe"
        }))
      }
    });
    beianManager.fakeData();//伪造数据
    beianManager.wsCreate('ws://localhost:3456');
    beianManager.wsSendStartCompare();
    /**
     * 测试用例：期望开始比对命令
     * @type {{type: string, bit: number[]}}
     */
    var expectStartData = {
      "type": "start_compare",
      "bit":[1,2]
    };
    setTimeout(
      function () {
        var timelineMsg = beianManager.getTimelineMsg();
        expect(serverMsg[0]['type']).toEqual(expectStartData['type']);
        expect(serverMsg[0]['data']).toEqual(expectStartData['data']);
        expect(timelineMsg[2]['event']).toEqual("比对开始失败，原因hehe");
        mockServer.stop();
        done();
      },100);
  });

  it('比对结果 回复success',function (done) {
    var mockServer = new Server('ws://localhost:3456');
    var serverMsg =[];
    mockServer.on('message',function (e){
      serverMsg.push(e);
        mockServer.send(JSON.stringify({
          "type": "compare_result",
          "state": "success"
        }))
    });
    beianManager.fakeData();//伪造数据
    beianManager.wsCreate('ws://localhost:3456');
    beianManager.wsSendStartCompare();
    setTimeout(
      function () {
        var timelineMsg = beianManager.getTimelineMsg();
        expect(timelineMsg[2]['event']).toEqual("比对成功");
        mockServer.stop();
        done();
      },100);
  });

  it('比对结果 回复fail',function (done) {
    var mockServer = new Server('ws://localhost:3456');
    var serverMsg =[];
    mockServer.on('message',function (e){
      serverMsg.push(e);
      mockServer.send(JSON.stringify({
        "type": "compare_result",
        "state": "fail",
        "reason":"通信不通，电源异常",//异常信息、失败原因
        "result": {
          "pass": [1,2], //通过的表位号
          "fail": [3,4] //失败的表位号
        }
      }))
    });
    beianManager.fakeData();//伪造数据
    beianManager.wsCreate('ws://localhost:3456');
    beianManager.wsSendStartCompare();
    setTimeout(
      function () {
        var timelineMsg = beianManager.getTimelineMsg();
        expect(timelineMsg[2]['event']).toEqual("[3,4]表位比对失败");
        mockServer.stop();
        done();
      },100);
  });

});
