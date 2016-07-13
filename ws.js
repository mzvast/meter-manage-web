var WebSocketServer = require('ws').Server,
  wss = new WebSocketServer({ port: 3456 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    global.setTimeout(function () {
      //判断返回值不是 json 格式
      if (typeof message !== 'string') {
        ws.send(JSON.stringify({
          "type": "file",
          "state": "next"
        }));
        console.log("type is :" + typeof message);
        console.log("got HEX file");
      } else if (!message.match("^\{(.+:.+,*){1,}\}$")) {
        //普通字符串处理
        ws.send('received: %s', message);
        console.log('received: %s', message);
      } else {
        //通过这种方法可将字符串转换为对象
        // data = eval("(" + data + ")");
        type = JSON.parse(message).type;
        // ws.send(type);
        console.log('type: %s', type);
        switch (type) {
        case 'hello':
          {
            ws.send(JSON.stringify({
              type: 'welcome',
              state: "success"
            }));
            break;
          }
        case 'info':
          {
            ws.send(JSON.stringify({
              "type": "info",
              "state": "success"
            }));
            break;
          }
        case 'record_num':
          {
            ws.send(JSON.stringify({
              "type": "record_num",
              "state": "success"
            }));
            break;
          }
        case 'start_compare':
          {
            ws.send(JSON.stringify({
              "type": "start_compare",
              "state": "success"
            }));
            ws.send(JSON.stringify({
              "type": "compare_result",
              "state": "success"
            }));
            break;
          }
        }
      }
      // ws.send(message.type);
    }, 100)
    var type;


  });

  // ws.send(JSON.stringify({ type: 'welcome' }));
});
