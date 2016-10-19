/**
 * Created by mzvast on 2016/10/11.
 */
'use strict';
angular.module('manageApp')
  .component('searchBoxComponent', {
    templateUrl: 'scripts/components/shared/searchBox/component.html',
    bindings: {
      onSearch: '&',
      onClear: '&'
    },
    controller: searchBoxController
  });

searchBoxController.$inject = [];

function searchBoxController() {
  var $ctrl = this;
  /**
   * 搜索
   */
  $ctrl.search = function() {
      $ctrl.onSearch({q:$ctrl.q});
  };

  $ctrl.clear = function() {
    $ctrl.q = '';
    $ctrl.onClear();
  };

}
