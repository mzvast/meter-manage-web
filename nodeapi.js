/**
 * Module dependencies.
 */
var express = require('express');
var httpProxy = require('http-proxy');
var bodyParser = require('body-parser');
var pdfPrinter = require('pdfmake');
var fs = require('fs');
// Node express server setup.
var server = express();
server.set('port', 8088);

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// server.use(express.static(__dirname + '/dist'));

server.all("/node/pdf",jsonParser,function (req, res) {
  if (!req.body) {
    return res.sendStatus(400);
  }
  console.log('get pdf!');
  console.log(req.body);
  print(req.body);
  return res.sendStatus(200);
});

// Start Server.
server.listen(server.get('port'), function() {
  console.log('Express server listening on port ' + server.get('port'));
});

var print = function (dd) {

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
  pdfDoc.pipe(fs.createWriteStream('pdfs/basics.pdf'));
  pdfDoc.end();


};
