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

  it('wsCreate should create Websocket',function (done) {
    var mockServer = new Server('ws://localhost:3456');
    mockServer.on('connection',function (){
      mockServer.send('test message 1');
      mockServer.send('test message 2');
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
      serverMsg.push(e);
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

  it('wsSendInfoMsg',function (done) {
    var mockServer = new Server('ws://localhost:3456');
    var serverMsg =[];
    mockServer.on('message',function (e){
      serverMsg.push(e);
    });
    beianManager.fakeData();//伪造数据
    beianManager.wsCreate('ws://localhost:3456');
    beianManager.wsSendInfoMsg();
    setTimeout(
      function () {

        expect(serverMsg[0]['type']).toEqual(beianManager.expectData['type']);

        expect(serverMsg[0]['data']['meter_info']).toEqual(beianManager.expectData['data']['meter_info']);

        expect(serverMsg[0]['data']['file_info']).toEqual(beianManager.expectData['data']['file_info']);

        expect(serverMsg[0]['data']['cpu_info'][0]['protect_addr']).toEqual(beianManager.expectData['data']['cpu_info'][0]['protect_addr']);

        expect(serverMsg[0]['data']['cpu_info'][0]['reserve_addr']).toEqual(beianManager.expectData['data']['cpu_info'][0]['reserve_addr']);

        expect(serverMsg[0]['data']['cpu_info'][0]['memory_addr']).toEqual(beianManager.expectData['data']['cpu_info'][0]['memory_addr']);

        expect(serverMsg[0]['data']['cpu_info'][0]['code_addr']).toEqual(beianManager.expectData['data']['cpu_info'][0]['code_addr']);

        expect(serverMsg[0]['data']['cpu_info'][0]['cpu_id']).toEqual(beianManager.expectData['data']['cpu_info'][0]['cpu_id']);

        expect(serverMsg[0]['data']['cpu_info'][1]['md5']).toEqual(beianManager.expectData['data']['cpu_info'][1]['md5']);

        // expect(serverMsg[0]).toEqual(beianManager.expectData);
        mockServer.stop();
        done();
      },100);
  });



  it('addTimelineMsg', function () {
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

  it('ws 发送 info 回复success',function (done) {
    var mockServer = new Server('ws://localhost:3456');
    var serverMsg =[];
    mockServer.on('message',function (e){
      serverMsg.push(e);
      if(e.type==='info'){
        mockServer.send({
          "type": "info",
          "state": "success"
        }) ;
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

  it('ws 发送 info 回复fail',function (done) {
    var mockServer = new Server('ws://localhost:3456');
    var serverMsg =[];
    mockServer.on('message',function (e){
      serverMsg.push(e);
      if(e.type==='info'){
        mockServer.send({
          "type": "info",
          "state": "fail",
          "reason":"hehe"
        }) ;
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

  it('ws 发送 hex 回复next',function (done) {
    var mockServer = new Server('ws://localhost:3456');
    var serverMsg =[];
    mockServer.on('message',function (e){
      serverMsg.push(e);
        mockServer.send({
          "type": "file",
          "state": "next"
        });
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

  it('ws 发送 hex 回复success',function (done) {
    var mockServer = new Server('ws://localhost:3456');
    var serverMsg =[];
    mockServer.on('message',function (e){
      serverMsg.push(e);
      mockServer.send({
        "type": "file",
        "state": "success"
      });
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

  it('ws 发送 hex 回复fail',function (done) {
    var mockServer = new Server('ws://localhost:3456');
    var serverMsg =[];
    mockServer.on('message',function (e){
      serverMsg.push(e);
      mockServer.send({
        "type": "file",
        "state": "fail",
        "reason":"hehe"
      });
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

  it('ws 发送start compare 回复success',function (done) {
    var mockServer = new Server('ws://localhost:3456');
    var serverMsg =[];
    mockServer.on('message',function (e){
      serverMsg.push(e);
      if(e.type==="start_compare"){
        mockServer.send({
          "type": "start_compare",
          "state": "success"
        })
      }
    });
    beianManager.fakeData();//伪造数据
    beianManager.wsCreate('ws://localhost:3456');
    beianManager.wsSendStartCompare();
    setTimeout(
      function () {
        var timelineMsg = beianManager.getTimelineMsg();
        expect(serverMsg[0]['type']).toEqual(beianManager.expectStartData['type']);
        expect(serverMsg[0]['data']).toEqual(beianManager.expectStartData['data']);
        expect(timelineMsg[2]['event']).toEqual("比对开始");
        mockServer.stop();
        done();
      },100);
  });

  it('ws 发送start compare 回复fail',function (done) {
    var mockServer = new Server('ws://localhost:3456');
    var serverMsg =[];
    mockServer.on('message',function (e){
      serverMsg.push(e);
      if(e.type==="start_compare"){
        mockServer.send({
          "type": "start_compare",
          "state": "fail",
          "reason":"hehe"
        })
      }
    });
    beianManager.fakeData();//伪造数据
    beianManager.wsCreate('ws://localhost:3456');
    beianManager.wsSendStartCompare();
    setTimeout(
      function () {
        var timelineMsg = beianManager.getTimelineMsg();
        expect(serverMsg[0]['type']).toEqual(beianManager.expectStartData['type']);
        expect(serverMsg[0]['data']).toEqual(beianManager.expectStartData['data']);
        expect(timelineMsg[2]['event']).toEqual("比对开始失败，原因hehe");
        mockServer.stop();
        done();
      },100);
  });

  it('sever compare_result回复success',function (done) {
    var mockServer = new Server('ws://localhost:3456');
    var serverMsg =[];
    mockServer.on('message',function (e){
      serverMsg.push(e);
        mockServer.send({
          "type": "compare_result",
          "state": "success"
        })
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

  it('sever compare_result回复fail',function (done) {
    var mockServer = new Server('ws://localhost:3456');
    var serverMsg =[];
    mockServer.on('message',function (e){
      serverMsg.push(e);
      mockServer.send({
        "type": "compare_result",
        "state": "fail",
        "reason":"通信不通，电源异常",//异常信息、失败原因
        "result": {
          "pass": [1,2], //通过的表位号
          "fail": [3,4] //失败的表位号
        }
      })
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
