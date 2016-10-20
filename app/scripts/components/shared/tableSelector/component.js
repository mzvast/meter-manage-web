/**
 * Created by mzvast on 2016/10/11.
 */
'use strict';
angular.module('manageApp')
  .component('tableSelectorComponent', {
    transclude:true,
    templateUrl: 'scripts/components/shared/tableSelector/component.html',
    bindings: {
      list: '<',
      model: '<',
      tabModel: '<',
      onOrder: '&',
      reverse: '<',
      predicate:'<',
      onRemove: '&',
      onEdit: '&',
      onAdd: '&',
      hideType:'<',
      onCheckInBasket: '&'
    },
    controller: tableSelectorController
  });

tableSelectorController.$inject = [];

function tableSelectorController() {
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

  $ctrl.add = function (item) {
    $ctrl.onAdd({item:item})
  };

  // 判断与basket中有重复
  $ctrl.checkInBasket = function (id) {
    // console.log('===>',id,$ctrl.onCheckInBasket({id:id}));
    return $ctrl.onCheckInBasket({id:id});
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
