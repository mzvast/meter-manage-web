/**
 * Module dependencies.
 */
var express = require('express');
var httpProxy = require('http-proxy');
var bodyParser = require('body-parser');
var pdfPrinter = require('pdfmake');
// Node express server setup.
var server = express();
server.set('port', 8088);

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// server.use(express.static(__dirname + '/dist'));

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
