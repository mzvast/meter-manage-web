/**
 * Created by mzvast on 2016/10/11.
 */
'use strict';
angular.module('manageApp')
  .component('checkModalComponent', {
    templateUrl: 'scripts/components/compareTesting/checkModal/component.html',
    bindings: {
      resolve: '<',
      close: '&',
      dismiss: '&'
    },
    controller: checkModalController
  });

checkModalController.$inject = [];

function checkModalController() {
  var $ctrl = this;


  $ctrl.$onInit = function () {
    $ctrl.title = $ctrl.resolve.title;
    $ctrl.data = $ctrl.resolve.data;
  };

  $ctrl.confirm =function () {
    console.log('confirm!')
  };

  $ctrl.ok = function () {
    $ctrl.close({$value: 'ok'});
  };

  $ctrl.cancel = function () {
    $ctrl.dismiss({$value: 'cancel'});
  };


}
