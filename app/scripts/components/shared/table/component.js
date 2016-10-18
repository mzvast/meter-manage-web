/**
 * Created by mzvast on 2016/10/11.
 */
'use strict';
angular.module('manageApp')
  .component('tableComponent', {
    templateUrl: 'scripts/components/shared/table/component.html',
    bindings: {
      name: '@',
      list: '<',
      model: '<',
      tabModel: '<',
      onOrder: '&',
      reverse: '<',
      predicate:'<'
    },
    controller: function($document,modelService) {
      var $ctrl = this;
      $ctrl.$onInit = function () {
        // $ctrl.predicate = Object.keys($ctrl.model)[0];
        // $ctrl.reverse = false;
      };

      $ctrl.order = function (key) {//TODO bug
        $ctrl.onOrder({key:key});
      };

      // $ctrl.$onChanges = function (changesObj) {
      //   if(changesObj.list){
      //     $ctrl.itemList = changesObj.list.currentValue;
      //   }
      //   // if(changesObj.predicate){
      //   //   $ctrl.predicate = changesObj.predicate.currentValue;
      //   // }
      // }

    },
  });
