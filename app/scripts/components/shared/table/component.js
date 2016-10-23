/**
 * Created by mzvast on 2016/10/11.
 */
'use strict';
angular.module('manageApp')
  .component('tableComponent', {
    templateUrl: 'scripts/components/shared/table/component.html',
    bindings: {
      list: '<',
      model: '<',
      tabModel: '<',
      onOrder: '&',
      reverse: '<',
      predicate:'<',
      onRemove: '&',
      onEdit: '&',
      hideType:'<',
      actionOnly: '<',
      onAction: '&'
    },
    controller: tableController
  });

tableController.$inject = [];

function tableController() {
  var $ctrl = this;
  $ctrl.$onInit = function () {
  };

}
