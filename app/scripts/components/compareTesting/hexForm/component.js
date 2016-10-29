/**
 * Created by mzvast on 2016/10/11.
 */
'use strict';
angular.module('manageApp')
  .component('hexFormComponent', {
    templateUrl: 'scripts/components/compareTesting/hexForm/component.html',
    bindings: {
      hexObj:'<',
      onSave:'&'
    },
    controller: hexFormController
  });

hexFormController.$inject = [];

function hexFormController() {
  var $ctrl = this;


  $ctrl.$onInit = function () {
    console.log($ctrl.hexObj);
  };

  $ctrl.submit = function () {
    // console.log($ctrl.hexObj);// 上传到service
    $ctrl.onSave({hexObj:$ctrl.hexObj});
  }


}
