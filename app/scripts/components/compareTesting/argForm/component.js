/**
 * Created by mzvast on 2016/10/11.
 */
'use strict';
angular.module('manageApp')
  .component('argFormComponent', {
    templateUrl: 'scripts/components/compareTesting/argForm/component.html',
    bindings: {
      args:'<',
      onSave:'&'
    },
    controller: argFormController
  });

argFormController.$inject = [];

function argFormController() {
  var $ctrl = this;

  $ctrl.options = {
    '220V':220,
    '380v':380
  };

  $ctrl.$onInit = function () {

  };

  $ctrl.submit =function () {
    $ctrl.onSave({args:$ctrl.args})
  }


}
