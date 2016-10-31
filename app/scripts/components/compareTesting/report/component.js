/**
 * Created by mzvast on 2016/10/11.
 */
'use strict';
angular.module('manageApp')
  .component('reportComponent', {
    templateUrl: 'scripts/components/compareTesting/report/component.html',
    bindings: {
      productInfo:'<',
      productDetail:'<',
      mcuInfo:'<',
      onMakePdf:'&',
      date:'<',
      result:'<'
    },
    controller: reportController
  });

reportController.$inject = [];

function reportController() {
  var $ctrl = this;


  $ctrl.$onInit = function () {
    $ctrl.table = [];
    console.log($ctrl.productInfo);
    console.log($ctrl.productDetail);
    console.log($ctrl.mcuInfo);

    var coreNum = $ctrl.mcuInfo.length;
    for(var i=0;i<coreNum;i++){
      $ctrl.table.push({
        coreId:i,
        data:[
        {
        name:"程序存储器起始地址",
        value:$ctrl.mcuInfo[i].memory_addr.start
      },{
        name:"程序存储器结束地址",
        value:$ctrl.mcuInfo[i].memory_addr.end
      },{
        name:"软件代码起始地址",
        value:$ctrl.mcuInfo[i].software_addr.start
      },{
        name:"软件代码结束地址",
        value:$ctrl.mcuInfo[i].software_addr.end
      },{
        name:"保护区数",
        value:$ctrl.mcuInfo[i].protect_addr.length
      },{
        name:"保留区数",
        value:$ctrl.mcuInfo[i].reserve_addr.length
      },{
        name:"保护区1起始地址",
        value:$ctrl.mcuInfo[i].protect_addr[0].start
      },{
        name:"保护区1结束地址",
        value:$ctrl.mcuInfo[i].protect_addr[0].end
      },{
        name:"保护区2起始地址",
        value:$ctrl.mcuInfo[i].protect_addr[1].start
      },{
        name:"保护区2结束地址",
        value:$ctrl.mcuInfo[i].protect_addr[1].end
      }]})
    }


    $ctrl.makePdf = function () {
      $ctrl.onMakePdf();
    }

  };




}
