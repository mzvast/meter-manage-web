'use strict';
angular.module('manageApp')
  .component('reliabilityTestingDoComponent', {
    templateUrl: 'scripts/components/reliabilityTesting/do/component.html',
    bindings: {},
    controller: reliabilityTestingDoController
  });

reliabilityTestingDoController.$inject = ['reliabilityTestingService'];

function reliabilityTestingDoController(reliabilityTestingService)
{
  var $ctrl = this;

  $ctrl.$onInit = function () {
    $ctrl.product = reliabilityTestingService.getProduct();
    $ctrl.envs = reliabilityTestingService.getEnvs();
    $ctrl.cases = reliabilityTestingService.getCases();

    console.dir($ctrl.product);
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
  }






}

