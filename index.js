/**
 * Module dependencies.
 */
var express = require('express');
var httpProxy = require('http-proxy');
// var bodyParser = require('body-parser');
var modRewrite = require('connect-modrewrite');
var javaApiForwardingUrl = 'http://localhost:8080';//'http://api.open-notify.org/astros.json?';
var nodeApiForwardingUrl = 'http://localhost:8088';
// Solution for forwarding from http to https taken from:
// http://stackoverflow.com/questions/15801014/how-to-use-node-http-proxy-for-http-to-https-routing
var proxyOptions = {
  changeOrigin: true
};

httpProxy.prototype.onError = function(err) {
  console.log(err);
};

var apiProxy = httpProxy.createProxyServer(proxyOptions);

console.log('Forwarding /api/* API requests to ' + javaApiForwardingUrl);
console.log('Forwarding /node/* API requests to ' + nodeApiForwardingUrl);

// Node express server setup.
var server = express();
server.set('port', 8000);

// server.use(express.static(__dirname + '/dist'));
server
  .use(modRewrite(['!/pdf|!/api|\\.jpg|\\.gif|\\.png|\\.svg|\\.woff2|\\.eot|\\.html|\\.js|\\.css|\\.woff|\\.ttf|\\.swf$ /index.html [L]']))
  .use(express.static(__dirname + '/dist'));
server.get('/index.html', function(req, res) {
  res.sendFile('dist/index.html');
});
server.all("/api/*", function(req, res) {
  apiProxy.web(req, res, {
    target: javaApiForwardingUrl
  });
});

server.all("/node/*", function(req, res) {
  apiProxy.web(req, res, {
    target: nodeApiForwardingUrl
  });
});

// Start Server.
server.listen(server.get('port'), function() {
  console.log('Express server listening on port ' + server.get('port'));
});

