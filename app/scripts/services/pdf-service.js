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

pdfService.$inject = ['$http','compareTestingService'];

function pdfService($http,compareTestingService) {
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
    var pdfBody = [
      [{ text: '厂家名称', colSpan: 2},{},
        {text:data.productInfo.vendor,colSpan:2},{}],
      [{ text: '电能表名称', colSpan: 2},{},
        {text:data.productInfo.name,colSpan:2},{}],
      [{ text: '软件备案号', colSpan: 2},{},
        {text:compareTestingService.getRecordNum()+'',colSpan:2},{}],
      [{ text: '电能表型号', colSpan: 2},{},
        {text:data.productInfo.model,colSpan:2},{}],
      [{ text: '软件版本号', colSpan: 2},{},
        {text:data.productDetail.program_version,colSpan:2},{}],
      [{ text: '软件适用类型', colSpan: 2},{},
        {text:data.productDetail.program_type==="normal"?"通用程序":"非通用程序",colSpan:2},     {}]
    ];

    var mcuNum = data.mcuInfo.length;
    for(var i=0;i<mcuNum;i++){
      pdfBody.push([{ text: 'MCU-'+(i+1), colSpan: 4, alignment: 'center'},
                    {},
                    {},
                    {}]);
      pdfBody.push(['程序存储器起始地址',
        data.mcuInfo[i].memory_addr.start,
        '程序存储器结束地址',
        data.mcuInfo[i].memory_addr.end
      ]);
      pdfBody.push(["软件代码起始地址",
        data.mcuInfo[i].software_addr.start,
        "软件代码结束地址",
        data.mcuInfo[i].software_addr.end
      ]);
      pdfBody.push(["保护区数",
        data.mcuInfo[i].protect_addr.length+'',
        "保留区数",
        data.mcuInfo[i].reserve_addr.length+''
      ]);
      pdfBody.push(["保护区1起始地址",
        data.mcuInfo[i].protect_addr[0].start,
        "保护区1结束地址",
        data.mcuInfo[i].protect_addr[0].end
      ]);
      pdfBody.push(["保护区2起始地址",
        data.mcuInfo[i].protect_addr[1].start,
        "保护区2结束地址",
        data.mcuInfo[i].protect_addr[1].end
      ])
    }
    //结果部分
    pdfBody.push([{ text:
      [
        {text:(data.result?'比对成功':'比对失败')+'\n\n\n\n',style:'bigMiddle'},
        {text:'盖章（签字）\n',style:'smallRight'},
        {text:data.date,style:'smallRight'}
      ], colSpan: 4,style:'result'
    },{},
      {},{}]);

    return {
      pageSize: 'A4',
      content: [
        { text: (data.mode===1?'备案':data.mode===2?'供货':'debug')+'比对测试报告', style: 'header' },
        { text: '报告编号:'+compareTestingService.getCompareNum(), style: 'subheader' },
        {
          style: 'tableExample',
          table: {
            widths: [ 'auto', 60, 'auto' ,60],
            body: pdfBody
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
