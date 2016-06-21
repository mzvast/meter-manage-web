'use strict';

/**
 * @ngdoc function
 * @name manageApp.controller:ActionTestCompareCtrl
 * @description
 * # ActionTestCompareCtrl
 * Controller of the manageApp
 */
angular.module('manageApp')
  .controller('ActionTestCompareCtrl', function () {
    var self = this;
    self.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var ws =new WebSocket('ws://localhost:3456');
    ws.onopen = function() {
      console.log("成功连接到" + $("#uri").val());
    };
    //收到服务器消息后响应
    ws.onmessage = function(e) {
      console.log("收到服务器消息:" + e.data + "'\n");
    };
    //连接关闭后响应
    ws.onclose = function() {
      console.log("关闭连接");
    };

    self.sendMsg = function () {
      ws.send(self.msg)
    };

    self.doCompare = function () {
      var file = self.myFile;
      console.log(file);
      ws.send(file.name);
      //读取文件　　
      var reader = new FileReader();
      reader.readAsArrayBuffer(file);
      //    reader.readAsText(file);
      //文件读取完毕后该函数响应
      reader.onload = function loaded(evt) {
        var binaryString = evt.target.result;
        console.log(evt.target.result);
        // Handle UTF-16 file dump
        var u8 = new Uint8Array(binaryString);
        console.log("\n开始发送文件");
        ws.send(binaryString);
      };

    };
  });
