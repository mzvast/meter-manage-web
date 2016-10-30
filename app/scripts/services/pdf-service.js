'use strict';

/**
 * @ngdoc service
 * @name manageApp.pdfService
 * @description
 * # pdfService
 * Service in the manageApp.
 */
angular.module('manageApp')
  .service('pdfService', pdfService);

pdfService.$inject = ['$http'];

function pdfService($http) {
  var self = this;
  var file,fileURL;

  self.getFileUrl = function (data,cb) {
    $http.post("/node/pdf", self.makeDocDef(data), {responseType: 'arraybuffer'})
      .then(function successCallback(data) {
      console.log(data.data);
      file = new Blob([data.data], {type: 'application/pdf'});
      fileURL = URL.createObjectURL(file);
        cb(fileURL);
    });

  };

  self.makeDocDef = function (data) {
    console.log(data);
    return {
      pageSize: 'A4',
      content: [
        { text: data.modeName+'比对测试报告', style: 'header' },
        { text: '报告编号:XXXXXXXXXXX', style: 'subheader' },
        {
          style: 'tableExample',
          table: {
            widths: [ 'auto', 60, 'auto' ,60],
            body: [
              [{ text: '厂家名称', colSpan: 2},{},
                {text:data.productInfo.vendor,colSpan:2},{}],
              [{ text: '电能表名称', colSpan: 2},{},
                {text:data.productInfo.name,colSpan:2},{}],
              [{ text: '软件备案号', colSpan: 2},{},
                {text:'//TODO'+'',colSpan:2},{}],
              [{ text: '电能表型号', colSpan: 2},{},
                {text:data.productInfo.model,colSpan:2},{}],
              [{ text: '软件版本号', colSpan: 2},{},
                {text:data.productDetail.program_version,colSpan:2},{}],
              [{ text: '软件适用类型', colSpan: 2},{},
                {text:data.productDetail.program_type==="normal"?"通用程序":"非通用程序",colSpan:2},{}],
              ['程序存储器起始地址',
                data.mcuInfo[0].memory_addr.start,
                '程序存储器结束地址',
                data.mcuInfo[0].memory_addr.end],
              ["软件代码起始地址",
                data.mcuInfo[0].software_addr.start,
                "软件代码结束地址",
                data.mcuInfo[0].software_addr.end
              ],["保护区数",
                "countProtectNum()"+'',
                "保留区数",
                "countReserveNum()"+''
              ],["保护区1起始地址",
                data.mcuInfo[0].protect_addr[0].start,
                "保护区1结束地址",
                data.mcuInfo[0].protect_addr[0].end
              ],["保护区2起始地址",
                data.mcuInfo[0].protect_addr[1].start,
                "保护区2结束地址",
                data.mcuInfo[0].protect_addr[1].end
              ],
              [{ text:
                [
                  {text:"data.resultStr"+'\n\n\n\n',style:'bigMiddle'},
                  {text:'盖章（签字）\n',style:'smallRight'},
                  {text:data.date,style:'smallRight'}
                ], colSpan: 4,style:'result'
              },{},
                {},{}]
            ]
          }
        },
        {text: '检验人员:                                       ' +
        '审核人员:', style: 'tableFooter' }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
          alignment: 'center'
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [70, 20, 0, 0]
        },
        tableExample: {
          margin: [70, 5, 0, 15]
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black'
        },
        result:{
          bold:true,
          margin: [5, 5, 5, 5]
        },
        bigMiddle:{
          blod:true,
          fontSize: 18,
          alignment: 'center',
          margin: [5, 10, 5, 5]
        },
        smallRight:{
          fontSize: 13,
          alignment: 'right'
        },
        tableFooter:{
          fontSize: 13,
          alignment: 'left',
          margin: [100, -10, 0, 0]
        }
      },
      defaultStyle: {
        font:'msyh'
        // alignment: 'center'
      }

    };
  }

}
