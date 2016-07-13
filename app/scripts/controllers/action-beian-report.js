'use strict';

/**
 * @ngdoc function
 * @name manageApp.controller:ActionBeianReportCtrl
 * @description
 * # ActionBeianReportCtrl
 * Controller of the manageApp
 */
angular.module('manageApp')
  .controller('ActionBeianReportCtrl', ['$scope','beianManager','dataManager',function ($scope,_beianManager,_dataManager)  {
    var vm = this;
    vm.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var mode =_beianManager.getMode(),
      isAllset = _beianManager.isAllSet();
    if(!isAllset){//没有数据,强制不进行下一步
      _beianManager.fakeDataDemo();//开发方便，模拟数据
      isAllset = _beianManager.isAllSet();
    }
    var result = _beianManager.getResult();

    vm.info = _beianManager.getInfo();
    vm.record_num = _beianManager.getRecordNum();
    vm.modeName = (mode===2?'供货':(mode===1?'备案':''));
    vm.resultStr = function(){
      switch (mode){
          case 1:{//备案
            return result?"备案成功，比对合格":"备案失败，比对不合格";
          }case 2:{//供货
          return result?"供货比对成功":"供货比对失败";
        }case 0:{
        return result?"比对成功":"比对失败";
      }
      }
    }();
    var countProtectNum = function () {
      var count=0;
      count+=vm.info.cpu_info.protect_addr[0].start?1:0;
      count+=vm.info.cpu_info.protect_addr[1].start?1:0;
      return count;
    };

    var countReserveNum = function () {
      var count=0;
      count+=vm.info.cpu_info.reserve_addr[0].start?1:0;
      count+=vm.info.cpu_info.reserve_addr[1].start?1:0;
      return count;
    };


    vm.table = [{
      name:"程序存储器起始地址",
      value:vm.info.cpu_info.memory_addr.start
    },{
      name:"程序存储器结束地址",
      value:vm.info.cpu_info.memory_addr.end
    },{
      name:"软件代码起始地址",
      value:vm.info.cpu_info.code_addr.start
    },{
      name:"软件代码结束地址",
      value:vm.info.cpu_info.code_addr.end
    },{
      name:"保护区数",
      value:countProtectNum()
    },{
      name:"保留区数",
      value:countReserveNum()
    },{
      name:"保护区1起始地址",
      value:vm.info.cpu_info.protect_addr[0].start
    },{
      name:"保护区1结束地址",
      value:vm.info.cpu_info.protect_addr[0].end
    },{
      name:"保护区2起始地址",
      value:vm.info.cpu_info.protect_addr[1].start
    },{
      name:"保护区2结束地址",
      value:vm.info.cpu_info.protect_addr[1].end
    }
    ];

    vm.date = function () {
      var Today=new Date();
      var todayStr = Today.getFullYear()+ " 年 " + (Today.getMonth()+1) + " 月 " + Today.getDate() + " 日";
      // console.log(todayStr);
      return todayStr;
    }();

    vm.pdfmake = function() {
      var dd = {
        pageSize: 'A4',
        content: [
          { text: vm.modeName+'比对测试报告', style: 'header' },
          { text: '报告编号:XXXXXXXXXXX', style: 'subheader' },
          {
            style: 'tableExample',
            table: {
              widths: [ 'auto', 60, 'auto' ,60],
              body: [
                [{ text: '厂家名称', colSpan: 2},{},
                  {text:vm.info.company_name,colSpan:2},{}],
                [{ text: '电能表名称', colSpan: 2},{},
                  {text:vm.info.meter_name,colSpan:2},{}],
                [{ text: '软件备案号', colSpan: 2},{},
                  {text:vm.record_num+'',colSpan:2},{}],
                [{ text: '电能表型号', colSpan: 2},{},
                  {text:vm.info.meter_model,colSpan:2},{}],
                [{ text: '软件版本号', colSpan: 2},{},
                  {text:vm.info.program_version,colSpan:2},{}],
                [{ text: '软件适用类型', colSpan: 2},{},
                  {text:vm.info.program_type==="normal"?"通用程序":"非通用程序",colSpan:2},{}],
                ['程序存储器起始地址',
                  vm.info.cpu_info.memory_addr.start,
                  '程序存储器结束地址',
                  vm.info.cpu_info.memory_addr.end],
                ["软件代码起始地址",
                  vm.info.cpu_info.code_addr.start,
                  "软件代码结束地址",
                  vm.info.cpu_info.code_addr.end
                ],["保护区数",
                  countProtectNum()+'',
                  "保留区数",
                  countReserveNum()+''
                ],["保护区1起始地址",
                  vm.info.cpu_info.protect_addr[0].start,
                  "保护区1结束地址",
                  vm.info.cpu_info.protect_addr[0].end
                ],["保护区2起始地址",
                  vm.info.cpu_info.protect_addr[1].start,
                  "保护区2结束地址",
                  vm.info.cpu_info.protect_addr[1].end
                ],
                [{ text:
                  [
                    {text:vm.resultStr+'\n\n\n\n',style:'bigMiddle'},
                    {text:'盖章（签字）\n',style:'smallRight'},
                    {text:vm.date,style:'smallRight'}
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
      _dataManager.pdfMake(JSON.stringify(dd));
      console.log('hehe');
    }
  }]);
