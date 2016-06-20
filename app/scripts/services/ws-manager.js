'use strict';

/**
 * @ngdoc service
 * @name manageApp.wsManager
 * @description
 * # wsManager
 * Service in the manageApp.
 */
angular.module('manageApp')
  .service('wsManager', ['$websocket',function ($websocket) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var self = this;
    // var ws = self.ws = $websocket('ws://localhost:8080/ws');

    self.Messages = function() {
      // var ws = $websocket('ws://115.159.143.179:3456');
      var ws = $websocket('wss://echo.websocket.org');
      var collection = [];

      ws.onMessage(function(event) {
        console.log('message: ', event);
        var res;
        try {
          res = JSON.parse(event.data);
        } catch(e) {
          res = {'username': 'anonymous', 'message': event.data};
        }

        collection.push({
          username: res.username,
          content: res.message,
          timeStamp: event.timeStamp
        });
      });

      ws.onError(function(event) {
        console.log('connection Error', event);
      });

      ws.onClose(function(event) {
        console.log('connection closed', event);
      });

      ws.onOpen(function() {
        console.log('connection open');
        ws.send('Hello World');
        ws.send('again');
        ws.send('and again');
      });
      // setTimeout(function() {
      //   ws.close();
      // }, 500)

      return {
        collection: collection,
        status: function() {
          return ws.readyState;
        },
        send: function(message) {
          if (angular.isString(message)) {
            ws.send(message);
          }
          else if (angular.isObject(message)) {
            ws.send(JSON.stringify(message));
          }
        }

      };
    }


  }]);
