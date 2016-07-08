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

  it('should create Websocket',function (done) {
    var mockServer = new Server('ws://localhost:3456');
    mockServer.on('connection',function (){
      mockServer.send('test message 1');
      mockServer.send('test message 2');
    });
    beianManager.wsCreate('ws://localhost:3456');
    setTimeout(
      function () {
        var messageLen = beianManager.messages.length;
        expect(messageLen===2).toBe(true);
        mockServer.stop();
        done();
      },100);
  });

  it('Client should send message to Server',function (done) {
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

  it('Client send info to Server',function (done) {
    var mockServer = new Server('ws://localhost:3456');
    var serverMsg =[];
    mockServer.on('message',function (e){
      serverMsg.push(e);
    });
    beianManager.fakeData();
    beianManager.wsCreate('ws://localhost:3456');
    beianManager.wsSendInfoMsg();
    setTimeout(
      function () {

        expect(serverMsg[0]['type']).toEqual(beianManager.expectData['type']);

        expect(serverMsg[0]['data']['meter_info']).toEqual(beianManager.expectData['data']['meter_info']);

        expect(serverMsg[0]['data']['file_info']).toEqual(beianManager.expectData['data']['file_info']);

        expect(serverMsg[0]['data']['cpu_info']['protect_addr']).toEqual(beianManager.expectData['data']['cpu_info']['protect_addr']);

        expect(serverMsg[0]['data']['cpu_info']['reserve_addr']).toEqual(beianManager.expectData['data']['cpu_info']['reserve_addr']);

        expect(serverMsg[0]['data']['cpu_info']['memory_addr']).toEqual(beianManager.expectData['data']['cpu_info']['memory_addr']);

        expect(serverMsg[0]['data']['cpu_info']['code_addr']).toEqual(beianManager.expectData['data']['cpu_info']['code_addr']);

        expect(serverMsg[0]['data']['cpu_info']['cpu_id']).toEqual(beianManager.expectData['data']['cpu_info']['cpu_id']);

        // expect(serverMsg[0]).toEqual(beianManager.expectData);
        mockServer.stop();
        done();
      },100);
  })

});
