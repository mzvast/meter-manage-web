/**
 * Module dependencies.
 */
var express = require('express');
var httpProxy = require('http-proxy');
var bodyParser = require('body-parser');
var pdfPrinter = require('pdfmake');
var fs = require('fs');
var modRewrite = require('connect-modrewrite');
var javaApiForwardingUrl = 'http://121.42.156.106:8080/dianbiao/';//'http://api.open-notify.org/astros.json?';
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

server.all("/api/*", function(req, res) {
  apiProxy.web(req, res, {
    target: javaApiForwardingUrl
  });
});

// server.use(express.static(__dirname + '/dist'));
server
  .use(modRewrite(['!/pdf|!/api|\\.jpg|\\.gif|\\.png|\\.svg|\\.woff2|\\.eot|\\.html|\\.js|\\.css|\\.woff|\\.ttf|\\.swf$ /index.html [L]']))
  .use(express.static(__dirname + '/dist'));
server.get('/index.html', function(req, res) {
  res.sendFile('dist/index.html');
});


var jsonParser = bodyParser.json();
server.post("/node/pdf",jsonParser,function (req, res) {
  if (!req.body) {
    return res.sendStatus(400);
  }
  console.log('get pdf!');
  // console.log(req.body);
  printToResponse(req.body,res);

});

// Start Server.
server.listen(server.get('port'), function() {
  console.log('Express server listening on port ' + server.get('port'));
});

var printToResponse = function (dd,res) {

  var docDefinition = dd;

  var fonts = {
    Roboto: {
      normal: 'Roboto-Regular.ttf',
      bold: 'Roboto-Medium.ttf',
      italics: 'Roboto-Italic.ttf',
      bolditalics: 'Roboto-Italic.ttf'
    },
    msyh: {
      normal: './fonts/msyh.ttf',
      bold: './fonts/msyh.ttf',
      italics: './fonts/msyh.ttf',
      bolditalics: './fonts/msyh.ttf'
    }
  };
  var printer = new pdfPrinter(fonts);
  var pdfDoc = printer.createPdfKitDocument(docDefinition);

  pdfDoc.pipe(res);//流处理，不在服务器存储结果
  pdfDoc.end();

};
