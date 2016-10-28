/**
 * Created by mzvast on 2016/10/11.
 */
'use strict';
angular.module('manageApp')
  .component('hexFormComponent', {
    templateUrl: 'scripts/components/compareTesting/hexForm/component.html',
    bindings: {
      hexObj:'<'
    },
    controller: hexFormController
  });

hexFormController.$inject = [];

function hexFormController() {
  var $ctrl = this;


  $ctrl.$onInit = function () {

  };

  $ctrl.submit = function () {
    console.log($ctrl.hexObj);//TODO 上传到service
  }


}
