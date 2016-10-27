'use strict';
angular.module('manageApp')
  .component('compareTestingDoComponent', {
    templateUrl: 'scripts/components/compareTesting/do/component.html',
    bindings: {},
    controller: compareTestingDoController
  });

compareTestingDoController.$inject = ['$state','caseService','compareTestingService','$uibModal'];

function compareTestingDoController($state,caseService,compareTestingService,$uibModal)
{
  var $ctrl = this;

  $ctrl.$onInit = function () {
    $ctrl.title = compareTestingService.getTitle();
    $ctrl.product = compareTestingService.getProduct();

    // console.dir($ctrl.product);
    // console.dir($ctrl.title);

    $ctrl.activeTabId = 0;
    $ctrl.tabModel = [{
      id:0,
      name:'产品信息'
    },{
      id:1,
      name:'参数配置'
    },{
      id:2,
      name:'HEX文件'
    }]

  };

  $ctrl.selectTab = function(id){
    $ctrl.activeTabId = id;
  };

  $ctrl.finish = function () {
    compareTestingService.finish(function (res) {
      console.log(res);
      $state.go('compareTesting',{},{reload: true});
    });
  };

  $ctrl.doTest = function (item) {
    console.log(item);
    (function () {
      var modalInstance = $uibModal.open({
        animation: $ctrl.animationsEnabled,
        component: 'recordModalComponent',
        resolve: {
          title: function () {
            return '用例执行';
          },
          caseId: function () {
             return item.id;
          }
        }
      });

      modalInstance.result.then(function (formObj) {//保存新增
        // formObj.type = formObj.type.id;//解码
        // console.log(formObj);
        compareTestingService.addResult(formObj);
        $ctrl.result = compareTestingService.getResult();
      }, function () {
        // console.info('dismissed at: ' + new Date());
      });
    })();
  };






}

