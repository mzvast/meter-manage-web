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
      hideType:'<'
    },
    controller: tableController
  });

tableController.$inject = [];

function tableController() {
  var $ctrl = this;
  $ctrl.$onInit = function () {
    // $ctrl.predicate = Object.keys($ctrl.model)[0];
    // $ctrl.reverse = false;
  };

  $ctrl.order = function (key) {
    $ctrl.onOrder({key:key});
  };

  $ctrl.remove = function (id) {
    $ctrl.onRemove({id:id});
  };

  $ctrl.edit = function (item) {
    $ctrl.onEdit({item:item});
  };

  // $ctrl.$onChanges = function (changesObj) {
  //   if(changesObj.list){
  //     $ctrl.itemList = changesObj.list.currentValue;
  //   }
  //   // if(changesObj.predicate){
  //   //   $ctrl.predicate = changesObj.predicate.currentValue;
  //   // }
  // }

}
