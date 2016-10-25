'use strict';
angular.module('manageApp')
  .component('reliabilityTestingDoComponent', {
    templateUrl: 'scripts/components/reliabilityTesting/do/component.html',
    bindings: {},
    controller: reliabilityTestingDoController
  });

reliabilityTestingDoController.$inject = ['$state','caseService','reliabilityTestingService','$uibModal'];

function reliabilityTestingDoController($state,caseService,reliabilityTestingService,$uibModal)
{
  var $ctrl = this;

  $ctrl.$onInit = function () {
    $ctrl.title = reliabilityTestingService.getTitle();
    $ctrl.product = reliabilityTestingService.getProduct();
    $ctrl.envs = reliabilityTestingService.getEnvs();
    $ctrl.cases = reliabilityTestingService.getCases();

    $ctrl.result = reliabilityTestingService.getResult();

    console.dir($ctrl.product);
    console.dir($ctrl.title);
    console.dir($ctrl.envs);
    console.dir($ctrl.cases);

    $ctrl.activeTabId = 0;
    $ctrl.tabModel = [{
      id:0,
      name:'产品'
    },{
      id:1,
      name:'环境'
    },{
      id:2,
      name:'用例'
    }]

  };

  $ctrl.selectTab = function(id){
    $ctrl.activeTabId = id;
  };

  $ctrl.finish = function () {
    reliabilityTestingService.finish(function (res) {
      console.log(res);
      $state.go('reliabilityTesting',{},{reload: true});
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
        reliabilityTestingService.addResult(formObj);
        $ctrl.result = reliabilityTestingService.getResult();
      }, function () {
        // console.info('dismissed at: ' + new Date());
      });
    })();
  };






}

