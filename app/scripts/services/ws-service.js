'use strict';

/**
 * @ngdoc service
 * @name manageApp.wsService
 * @description
 * # wsService
 * Service in the manageApp.
 */
angular.module('manageApp')
  .service('wsService', wsService);

wsService.$inject = ['$rootScope'];

function wsService($rootScope) {
  var self = this;

  var message = [];
  var ws,
    mode = 0,//自动流转模式标志，1-备案比对，2-供货比对,0-测试模式（单步运行）
    result = false;//比对结果

  var hex,currentHexIndex,infoObj;
  /**
   * Hex 设置
   */

  self.setHexObj = function (hexObj) {
    hex = hexObj.map(function (item) {
      return item.hex;
    });
    currentHexIndex = 0;
  };

  /**
   * Info 设置
   */

  self.setInfoObj = function (new_infoObj) {
    infoObj = new_infoObj
  };

  self.getInfoObj = function () {
    return infoObj
  };




  /**
   * Message相关
   */

  self.addMessage = function (msg) {
    message.push(msg);
    $rootScope.$emit('timeline-updated');
  };

  self.getMessage = function () {
    return message;
  };

  self.clearMessage = function () {
    message = [];
    $rootScope.$emit('timeline-updated');
  };

  self.subscribe = function (scope, callback) {
    var hander = $rootScope.$on('timeline-updated',callback);
    scope.$on('$destroy',hander);
  };

  self.testMessage = function () {
    self.addMessage({
      direction: "in",
      type: "success",
      time: Date.now(),
      event: "消息服务已启动"
    })
  };

  /**
   * 比对流程控制Flow函数
   */
  var flow = function (from, state) {
    console.log("进入flow,mode:" + mode);
    if (mode === 0) return false;
    console.log("from:" + from);

    if (state === 'fail') {
      if (from === 'compare_result') {
        // self.setResult(false);//TODO
        console.log('got result');
        // $state.go('action-beian.report');//TODO
      }
      // return false;
    } else {
      switch (from) {
        case 'welcome':
          self.wsSendInfoMsg();
          break;
        case 'info':
          if (state === 'success') {
            self.wsSendHex(0);
          }
          break;
        case 'file':
          if (state === 'next') {
            if (++currentHexIndex<hex.length) {//浏览器判断发完了
              self.wsSendHex(currentHexIndex);
            } else {
              if (mode === 1) {
                self.wsSendStartCompare();
              } else if (mode === 2) {
                self.wsSendRecordNum();
              }
            }
          } else if (state === 'success') {//客户端判断发完了
            if (mode === 1) {
              self.wsSendStartCompare();
            } else if (mode === 2) {
              self.wsSendRecordNum();
            }
          }
          break;
        case 'record_num':
        {
          if (state === 'success') {
            self.wsSendStartCompare();
          }
          break;
        }
        case 'compare_result':
        {
          if (state === 'success') {
            self.setResult(true);
            console.log('got result');//TODO
            // $state.go('action-beian.report');
          }
        }
      }
    }
  };

  /**
   * 新建WebSocket连接
   * @param url 格式'ws//host:port'
   */
  self.wsCreate = function (url) {
    // self.setResult(false);//重置测试结果TODO
    if (!url) return;
    ws = new WebSocket(url);
    message = [];

    // self.wsSendHello();

    /**
     * WebSocket错误处理
     */
    ws.onerror = function () {
      self.addMessage({
        direction: "in",
        type: "fail",
        time: Date.now(),
        event: "WebSocket连接失败"
      });
      $rootScope.$apply();
    };
    /**
     * WebSocket关闭事件
     */
    ws.onclose = function () {
      self.addMessage({
        direction: "in-final",
        type: "success",
        time: Date.now(),
        event: "WebSocket连接已关闭"
      });
      $rootScope.$apply();
    };
    /**
     * WebSocket传入事件处理
     * @param event 传入的JSON字符串
     */
    ws.onmessage = function (event) {
      var cleanData;
      if (!event.data.match("^\{(.+:.+,*){1,}\}$")) {//普通字符串处理
        cleanData = event.data;
        return;
      } else {
        cleanData = JSON.parse(event.data);//通过这种方法可将字符串转换为对象 data = eval("("+data+")");
      }
      console.log(cleanData);

      if (cleanData.type === 'welcome') {
        self.addMessage({
          direction: "in",
          type: "success",
          time: Date.now(),
          event: "WebSocket连接成功"
        });
      } else if (cleanData.type === 'info') {
        switch (cleanData.state) {
          case 'success':
          {
            self.addMessage({
              direction: "in",
              type: "success",
              time: Date.now(),
              event: "比对信息发送成功"
            });
            break;
          }
          case 'fail':
          {
            self.addMessage({
              direction: "in",
              type: "fail",
              time: Date.now(),
              event: "比对信息发送失败，原因" + cleanData.reason || '未知'
            });
          }
        }
      } else if (cleanData.type === 'file') {
        switch (cleanData.state) {
          case 'next':
          {
            self.addMessage({
              direction: "in",
              type: "success",
              time: Date.now(),
              event: "上一个HEX文件发送成功,准备发送下一个"
            });
            break;
          }
          case 'success':
          {
            self.addMessage({
              direction: "in",
              type: "success",
              time: Date.now(),
              event: "HEX文件全部发送成功"
            });
            break;
          }
          case 'fail':
          {
            self.addMessage({
              direction: "in",
              type: "fail",
              time: Date.now(),
              event: "HEX文件发送失败，原因" + cleanData.reason || "未知"
            });
          }
        }
      } else if (cleanData.type === 'record_num') {
        switch (cleanData.state) {
          case 'success':
          {
            self.addMessage({
              direction: "in",
              type: "success",
              time: Date.now(),
              event: "备案号发送成功"
            });
            break;
          }
          case 'fail':
          {
            self.addMessage({
              direction: "in",
              type: "fail",
              time: Date.now(),
              event: "备案号发送失败，原因" + cleanData.reason || "未知"
            });
          }
        }
      } else if (cleanData.type === 'start_compare') {
        switch (cleanData.state) {
          case 'success':
          {
            self.addMessage({
              direction: "in",
              type: "success",
              time: Date.now(),
              event: "比对开始"
            });
            break;
          }
          case 'fail':
          {
            self.addMessage({
              direction: "in",
              type: "fail",
              time: Date.now(),
              event: "比对开始失败，原因" + cleanData.reason || "未知"
            });
          }
        }
      } else if (cleanData.type === 'progress') {
        switch (cleanData.state) {
          case 'success':
          {
            console.log('进度',cleanData.percentage);
            // self.updateProgress(cleanData.percentage);
            // if (!isProgresStart) {
            //   self.addMessage({
            //     direction: "in_progress",
            //     type: "success",
            //     time: Date.now(),
            //     event: cleanData.percentage
            //   });
            //   // isProgresStart = true;TODO
            // } else self.updateTimelineMsg(cleanData.percentage);
            break;
          }
          case 'fail':
          {
          }
        }
      }
      else if (cleanData.type === 'compare_result') {
        switch (cleanData.state) {
          case 'success':
          {
            self.addMessage({
              direction: "in-final",
              type: "success",
              time: Date.now(),
              event: "比对成功"
            });
            ws.close();
            break;
          }
          case 'fail':
          {
            self.addMessage({
              direction: "in-final",
              type: "fail",
              time: Date.now(),
              event: "[" + cleanData.result.fail + "]表位比对失败"
            });
            ws.close();
          }
        }
      }
      $rootScope.$apply();
      flow(cleanData.type, cleanData.state);

    };

    ws.onopen = function () {
      self.wsSendHello();
    }
  };
  /**
   * 关闭WebSocket连接
   */
  self.wsClose = function () {
    if (ws && ws.readyState !== WebSocket.CLOSED) {
      ws.close();
      self.clearMessage();
    }
  };

  /**
   * 比对结果设置
   * @param value
   */
  self.setResult = function (value) {
    result = value;
    console.log("设置比对结果:" + (value ? "成功" : "失败"));
    return true;
  };

  self.getResult = function () {
    console.log("比对结果:" + (result ? "成功" : "失败"));
    return result;
  };
  /**
   * 比对mode设置
   */

  self.setMode = function (value) {
    mode = value;
    if (mode === 0) {
      console.log('测试模式 mode:' + mode);
    } else if (mode === 1) {
      console.log('备案比对模式 mode:' + mode);
    } else if (mode === 2) {
      console.log('供货比对 mode:' + mode);
    }
  };

  self.getMode = function () {
    return mode;
  };

  /**
   * 使用WebSocket发送JSON字符串化对象
   * @param msg
   */
  self.wsSend = function (msg) {
    if (ws) {
      ws.send(JSON.stringify(msg));
    }
  };

  /**
   * 发送握手信息和模式信息
   */
  self.wsSendHello = function () {
    self.addMessage({
      direction: "out",
      type: "success",
      time: Date.now(),
      event: "建立WebSocket连接"
    });
    console.log("欢迎信息已发送");
    self.wsSend({
      type: "hello",
      mode: mode ? mode : 0
    });
  };
  /**
   * 发送比对信息
   */
  self.wsSendInfoMsg = function () {
    var infoMsg = {
      type: 'info',
      data: infoObj
    };
    console.log("比对信息debug");
    console.log(infoMsg);//debug info msg
    self.addMessage({
      direction: "out",
      type: "success",
      time: Date.now(),
      event: "发送比对信息"
    });
    self.wsSend(infoMsg);
  };
  /**
   * 发送HEX文件
   * @param index 文件索引，取值0或者1
   */
  self.wsSendHex = function (index) {
    if (hex[index]) {
      self.addMessage({
        direction: "out",
        type: "success",
        time: Date.now(),
        event: "发送HEX文件["+index+"]"
      });
      ws.send(hex[index]);
    }
  };
  /**
   * 发送开始比对命令
   */
  self.wsSendStartCompare = function () {

    self.addMessage({
      direction: "out",
      type: "success",
      time: Date.now(),
      event: "发送开始比对命令"
    });
    self.wsSend({
      "type": "start_compare",
    });
  };
  /**
   * 发送备案号
   */
  self.wsSendRecordNum = function (recordNum) {
    self.addMessage({
      direction: "out",
      type: "success",
      time: Date.now(),
      event: "发送备案号"
    });
    var obj = {
      type: "record_num",
      value: recordNum
    };
    self.wsSend(obj);
  };

}
