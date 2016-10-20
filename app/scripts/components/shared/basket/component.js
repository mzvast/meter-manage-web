/**
 * Created by mzvast on 2016/10/11.
 */
'use strict';
angular.module('manageApp')
  .component('basketComponent', {
    templateUrl: 'scripts/components/shared/basket/component.html',
    bindings: {
      onSearch: '&',
      onClear: '&',
      list:'<'//TODO
    },
    controller: basketController
  });

basketController.$inject = [];

function basketController() {
  var $ctrl = this;

  $ctrl.$onInit =function () {
    console.log($ctrl.list)
  };

  $ctrl.remove = function ($index) {
    $ctrl.list.splice($index,1);
  };

}
