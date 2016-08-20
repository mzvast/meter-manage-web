'use strict';

/**
 * @ngdoc service
 * @name manageApp.beianManager
 * @description
 * # beianManager
 * Service in the manageApp.
 */
angular.module('manageApp')
  .service('beianManager', ['$rootScope', 'dataManager', '$state',function ($rootScope, _dataManager,$state) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var vm = this;
    var product,
      info,
      arg,
      hex = [],
      md5 = [],
      filename = [],
      recordNum;

    var ws,
      infoMsg,//比对信息对象
      message = [],//系统消息
      timelineMsg = [],//时间线
      mode=0,//自动流转模式标志，1-备案比对，2-供货比对,0-测试模式（单步运行）
      result=false;//比对结果
    /**
     * 判断数据是否都设置正确
     * @returns {boolean}
       */
    vm.isAllSet = function(){
      return (product&&info&&arg&&(md5[0]||md5[1]))?true:false;
    };

    /**
     * 比对结果设置
     * @param value
       */
    vm.setResult = function (value) {
      result = value;
      console.log("设置比对结果:"+(value?"成功":"失败"));
      return true;
    };

    vm.getResult = function () {
      console.log("比对结果:"+(result?"成功":"失败"));
      return result;
    };

    vm.setMode = function (value) {
      mode = value;
      if(mode===0){
        console.log('测试模式 mode:'+mode);
      }else if(mode===1){
        console.log('备案比对模式 mode:'+mode);
      }else if(mode===2){
        console.log('供货比对 mode:'+mode);
      }
    };

    vm.getMode = function () {
      return mode;
    };
    /**
     * 产品选择
     * @param item
     * @returns {boolean}
     */
    vm.setProduct = function (item) {
      product = item;
      console.log("product id = " + item.id);
      return true;
    };
    vm.getProduct = function () {
      return product;
    };
    /**
     * 比对信息
     * @param item
     * @returns {boolean}
     */
    vm.setInfo = function (item) {
      info = item;
      console.log(JSON.stringify(item));
      return true;
    };
    vm.getInfo = function () {
      return info;
    };
    /**
     * 参数设置
     * @param item
     * @returns {boolean}
     */
    vm.setArg = function (item) {
      arg = item;
      console.log(arg);
      localStorage['arg'] = angular.toJson(arg);//存储到本地
      console.log(localStorage['arg']);
      return true;
    };
    vm.getArg = function () {
      var localArg = localStorage['arg'],
          arg = [];
      if(localArg){//本地存在数据
        arg = JSON.parse(localArg);
      }else{//本地没有
        var i;
        for(i=0;i<4;i++){
          arg.push({
            bit:i+1,
            on:false,
            num: "xxxxxxxxxxxx",
            addr:"xxxxxxxxxxxx",
            type:"single_phase",
            vol:220,
            key_index:"04"
          })
        }
        for(i=4;i<8;i++){
          arg.push({
            bit:i+1,
            on:false,
            num: "xxxxxxxxxxxx",
            addr:"xxxxxxxxxxxx",
            type:"three_phase",
            vol:220,
            key_index:"04"
          })
        }
      }
      return arg;
    };
    /**
     * 备案信息
     * @param item
     * @returns {boolean}
     */
    vm.setRecordNum = function (item) {
      recordNum = item;
      return true;
    };

    vm.getRecordNum = function () {
      return recordNum;
    };
    /**
     * HEX文件
     * @param hexFile
     * @param index
     * @returns {boolean}
     */
    vm.setHex = function (hexFile, index, name) {
      if (hexFile instanceof ArrayBuffer) {
        console.log("true");
        hex[index] = hexFile;
        md5[index] = SparkMD5.ArrayBuffer.hash(hex[index]);
        filename[index] = name;
        $rootScope.$apply();
        return true;
      }
      console.log("false");
      return false;
    };

    vm.getHex = function (index) {
      if (hex[index]) {
        return hex[index];
      }
    };

    vm.resetHex = function () {
      hex = [];
      md5 = [];
    };

    vm.removeHex = function (index) {
      hex.splice(index, 1, undefined);
      md5.splice(index, 1, undefined);
    };

    vm.getHexLength = function (index) {
      if (hex[index] && (hex[index] instanceof ArrayBuffer)) {
        var len = hex[index].byteLength;
        console.log("byteLength:" + len);
        return len;
      }
    };
    vm.getMd5 = function (index) {
      if (md5[index]) {
        console.log(md5[index]);
        return md5[index];
      }
    };


    /**
     * 新建WebSocket连接
     * @param url 格式'ws//host:port'
     */
    vm.wsCreate = function (url) {
      vm.setResult(false);//重置测试结果
      if (!url) return;
      ws = new WebSocket(url);
      timelineMsg = [];
      message = [];

      // vm.wsSendHello();

      /**
       * WebSocket错误处理
       */
      ws.onerror = function () {
        vm.addTimelineMsg({
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
        vm.addTimelineMsg({
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
          addMessage(cleanData);
          console.log(cleanData);

        if (cleanData.type === 'welcome') {
          vm.addTimelineMsg({
            direction: "in",
            type: "success",
            time: Date.now(),
            event: "WebSocket连接成功"
          });
        } else if (cleanData.type === 'info') {
          switch (cleanData.state) {
            case 'success':
            {
              vm.addTimelineMsg({
                direction: "in",
                type: "success",
                time: Date.now(),
                event: "比对信息发送成功"
              });
              break;
            }
            case 'fail':
            {
              vm.addTimelineMsg({
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
              vm.addTimelineMsg({
                direction: "in",
                type: "success",
                time: Date.now(),
                event: "上一个HEX文件发送成功,准备发送下一个"
              });
              break;
            }
            case 'success':
            {
              vm.addTimelineMsg({
                direction: "in",
                type: "success",
                time: Date.now(),
                event: "HEX文件全部发送成功"
              });
              break;
            }
            case 'fail':
            {
              vm.addTimelineMsg({
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
              vm.addTimelineMsg({
                direction: "in",
                type: "success",
                time: Date.now(),
                event: "备案号发送成功"
              });
              break;
            }
            case 'fail':
            {
              vm.addTimelineMsg({
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
              vm.addTimelineMsg({
                direction: "in",
                type: "success",
                time: Date.now(),
                event: "比对开始"
              });
              break;
            }
            case 'fail':
            {
              vm.addTimelineMsg({
                direction: "in",
                type: "fail",
                time: Date.now(),
                event: "比对开始失败，原因" + cleanData.reason || "未知"
              });
            }
          }
        } else if (cleanData.type === 'compare_result') {
          switch (cleanData.state) {
            case 'success':
            {
              vm.addTimelineMsg({
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
              vm.addTimelineMsg({
                direction: "in-final",
                type: "fail",
                time: Date.now(),
                event: "[" + cleanData.result.fail + "]表位比对失败"
              });
              ws.close();
            }
          }
        }
        flow(cleanData.type,cleanData.state);
        $rootScope.$apply();

      };

      ws.onopen = function () {
        vm.wsSendHello();
        $rootScope.$apply();
      }
    };
    /**
     * 关闭WebSocket连接
     */
    vm.wsClose = function () {
      if (ws && ws.readyState !== WebSocket.CLOSED) {
        ws.close();
        timelineMsg=[];
        message = [];
      }
    };
    var addMessage = function (msg) {
      message.push(msg);
    };

    vm.getMessage = function () {
      return message;
    };
    /**
     * 使用WebSocket发送JSON字符串化对象
     * @param msg
     */
    vm.wsSend = function (msg) {
      if (ws) {
        ws.send(JSON.stringify(msg));
      }
    };
    /**
     * 比对信息生成辅助函数
     */
    var makeInfoMsg = function () {
      infoMsg = {
        type: 'info',
        data: {
          file_info: [],
          cpu_info: [],
          meter_info: []
        }
      };
      var setFileInfo = function () {
        var i;
        for (i = 0; i < md5.length; i++) {
          infoMsg.data.file_info.push({
            cpu_id: i + 1,
            md5: md5[i],
            extname:filename[i].split(".")[1]
          });
        }
      }();

      var setCpuInfo = function () {
        for (var i = 0; i < md5.length; i++) {
          var obj = angular.copy(info.cpu_info);
          infoMsg['data']['cpu_info'].push(obj);//两个CPU信息完全一样
          infoMsg['data']['cpu_info'][i]['cpu_id'] = i + 1;
        }
      }();

      var setMeterInfo = function () {
        for (var i = 0; i < arg.length; i++) {
            var temp = angular.copy(arg[i]);
          if(temp['on']){
            delete temp['on'];
            delete temp["$$hashKey"];
            temp['costcontrol_type'] = info.costcontrol_type;
            infoMsg.data.meter_info.push(temp);
          }
        }
      }();

    };

    vm.getInfoMsg = function () {
      makeInfoMsg();
      return infoMsg;
    };

      /**
       * 发送握手信息和模式信息
       */
    vm.wsSendHello = function () {
      vm.addTimelineMsg({
        direction: "out",
        type: "success",
        time: Date.now(),
        event: "建立WebSocket连接"
      });
      console.log("欢迎信息已发送");
      vm.wsSend({
        type:"hello",
        mode:mode?mode:0
      });
    };
    /**
     * 发送比对信息
     */
    vm.wsSendInfoMsg = function () {
      makeInfoMsg();
      console.log("比对信息debug");
      console.log(infoMsg);//debug info msg
      vm.addTimelineMsg({
        direction: "out",
        type: "success",
        time: Date.now(),
        event: "发送比对信息"
      });
      vm.wsSend(infoMsg);
    };
    /**
     * 发送HEX文件
     * @param index 文件索引，取值0或者1
     */
    vm.wsSendHex = function (index) {
      if(hex[index]){
        vm.addTimelineMsg({
          direction: "out",
          type: "success",
          time: Date.now(),
          event: "发送HEX文件[" + index + "]"
        });
        ws.send(hex[index]);
      }
    };
    /**
     * 发送开始比对命令
     */
    vm.wsSendStartCompare = function () {
      var startMsg = {
        "type": "start_compare",
        "bit": []
      };
      var setMsg = function () {
        makeInfoMsg();
        for (var i = 0; i < infoMsg.data.meter_info.length; i++) {
          startMsg.bit.push(infoMsg.data.meter_info[i]['bit']);
        }
      }();
      vm.addTimelineMsg({
        direction: "out",
        type: "success",
        time: Date.now(),
        event: "发送开始比对命令"
      });
      vm.wsSend(startMsg);
    };
    /**
     * 发送备案号
     */
    vm.wsSendRecordNum = function () {
      vm.addTimelineMsg({
        direction: "out",
        type: "success",
        time: Date.now(),
        event: "发送备案号"
      });
      var obj = {
        type: "record_num",
        value: recordNum
      };
      vm.wsSend(obj);
    };
    /**
     * 时间线添加消息
     * @param msg
     */
    vm.addTimelineMsg = function (msg) {
      timelineMsg.push(msg);
    };
    /**
     * 获取时间线
     * @returns {Array}
     */
    vm.getTimelineMsg = function () {
      return timelineMsg;
    };

    vm.clearTimelineMsg = function () {
      timelineMsg = [];
      message = [];
    };

    vm.doCompare = function () {

    };

    vm.getReport = function () {

    };

    /**
     * 获取全部变量
     * @returns {{product: *, info: *, arg: *, md5: Array}}
     */
    vm.getAll = function () {
      return {
        product: product,
        info: info,
        arg: arg,
        md5: md5,
        recordNum: recordNum
      };
    };
    /**
     * 重置全部变量
     */
    vm.resetAll = function () {
      ws = undefined;
      product = undefined;
      info = undefined;
      arg = undefined;
      recordNum = undefined;
      hex = [];
      md5 = [];
    };
    /**
     * 生成模拟数据（除了HEX文件，无md5）
     */
    vm.fakeDataDemo = function () {
      vm.fakeData();
      md5 = [];
      hex=[];
    };
    /**
     * 生成模拟数据（含md5）
     */
    vm.fakeData = function () {

      hex[0]=new ArrayBuffer();
      hex[1]=new ArrayBuffer();

      recordNum=1234567890123456;

      product = {
        id: "23",
        name: "苹果电表",
        batch: "01",
        vendor: "APPLE",
        desciption: "此人很懒"
      };

      md5[0] = 'd9fc6d737aea3345f681f24c8a2bb07c';
      md5[1] = 'd9fc6d737aea3345f681f24c8a2bb07d';
      filename[0] = '0.hex';
      filename[1] = '1.hex';

      info = {
        "cpu_info": {
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
          ],
          "memory_addr": {
            "start": "4000",
            "end": "13fff"
          },
          "code_addr": {
            "start": "4000",
            "end": "97ff"
          }
        },
        "company_name": "XXXXXXXX有限公司",
        "meter_name": "XXXX",
        "company_code": "0020",
        "meter_model": "DDSF001-M",
        "v_spec": "220V",
        "i_spec": "5(60)A",
        "costcontrol_type": "em_esam",
        "mcu_model": "瑞萨电子R5F212B8",
        "program_version": "V 1.0",
        "program_type": "normal",
        "program_for_meter": "0.2s级三相智能电能表"
      };

      arg = [{
        "bit": 1,
        "on":true,
        "num": "xxxxxxxxxxxx",
        "addr": "xxxxxxxxxxxx",
        "type": "single_phase",
        "vol": 220,
        "key_index": "04"
      }, {
        "bit": 2,
        "on":true,
        "num": "xxxxxxxxxxxx",
        "addr": "xxxxxxxxxxxx",
        "type": "single_phase",
        "vol": 220,
        "key_index": "04"
      }];

    };

    var flow = function (from, state) {
      console.log("进入flow,mode:"+mode);
      if(mode===0) return false;
      console.log("from:"+from);

      if (state === 'fail') {
        if(from==='compare_result'){
          vm.setResult(false);
          $state.go('action-beian.report');
        }
        // return false;
      } else {
        switch (from) {
          case 'welcome':
            vm.wsSendInfoMsg();
            break;
          case 'info':
            if (state === 'success') {
              vm.wsSendHex(0);
            }
            break;
          case 'file':
            if (state === 'next') {
              if(hex[1]){
                vm.wsSendHex(1);//浏览器判断发完了
              }else{
                if(mode===1){
                  vm.wsSendStartCompare();
                }else if(mode===2){
                  vm.wsSendRecordNum();
                }
              }
            } else if (state === 'success') {//客户端判断发完了
              if(mode===1){
                vm.wsSendStartCompare();
              }else if(mode===2){
                vm.wsSendRecordNum();
              }
            }
            break;
          case 'record_num':{
            if(state==='success'){
              vm.wsSendStartCompare();
            }
            break;
          }
          case 'compare_result':{
            if(state==='success'){
              vm.setResult(true);
              $state.go('action-beian.report');
            }
          }
        }
      }
    }
  }]);
