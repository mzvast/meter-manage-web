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
  // /**
  //  * 搜索
  //  */
  // $ctrl.search = function() {
  //     $ctrl.onSearch({q:$ctrl.q});
  // };
  //
  // $ctrl.clear = function() {
  //   $ctrl.q = '';
  //   $ctrl.onClear();
  // };
  // $ctrl.list = $ctrl.list.slice();
  $ctrl.remove = function ($index) {
    $ctrl.list.splice($index,1);
  };

}
