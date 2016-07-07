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
    beianManager.createWS();
    setTimeout(
      function () {
        var messageLen = beianManager.messages.length;
        console.log("messageLen:"+messageLen);
        mockServer.stop();
        done();
      },100);
  })
});
