/**
 * Created by mzvast on 2016/10/11.
 */
'use strict';
angular.module('manageApp')
  .component('recordModalComponent', {
    templateUrl: 'scripts/components/reliabilityTesting/do/recordModal/component.html',
    bindings: {
      resolve: '<',
      close: '&',
      dismiss: '&'
    },
    controller: recordModalController

  });

recordModalController.$inject = ['caseService','formModelService'];

function recordModalController(caseService,formModelService) {
  var $ctrl = this;

  $ctrl.$onInit = function () {
    $ctrl.form = {};
    $ctrl.record = '数据正常';
    $ctrl.title = $ctrl.resolve.title;
    $ctrl.caseId = $ctrl.resolve.caseId;
    caseService.get($ctrl.caseId,function (res) {
      $ctrl.content = res.data;
      console.log($ctrl.content)
    });
    $ctrl.items = formModelService.get('cases');
  };

  $ctrl.pass = -1;

  $ctrl.ok = function () {
    $ctrl.form.caseId = $ctrl.caseId;
    $ctrl.form.pass = $ctrl.pass;
    $ctrl.form.record = $ctrl.record;
    $ctrl.close({$value: $ctrl.form});
  };

  $ctrl.cancel = function () {
    $ctrl.dismiss({$value: 'cancel'});
  };


}
