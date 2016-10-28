/**
 * Created by mzvast on 2016/10/11.
 */
'use strict';
angular.module('manageApp')
  .component('hexFormComponent', {
    templateUrl: 'scripts/components/compareTesting/hexForm/component.html',
    bindings: {

    },
    controller: hexFormController
  });

hexFormController.$inject = ['compareTestingService'];

function hexFormController(compareTestingService) {
  var $ctrl = this;


  $ctrl.$onInit = function () {
    $ctrl.hexObj = compareTestingService.getAllHex();
  };

  //TODO 逻辑放到外面

}
