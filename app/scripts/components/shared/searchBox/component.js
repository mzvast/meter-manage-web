/**
 * Created by mzvast on 2016/10/11.
 */
'use strict';
angular.module('manageApp')
  .component('searchBoxComponent', {
    templateUrl: 'scripts/components/shared/searchBox/component.html',
    bindings: {
      onSearch: '&'
    },
    controller: function($document,notificationService) {
      var $ctrl = this;
      /**
       * 搜索
       */
      $ctrl.search = function() {
        if($ctrl.q){
          $ctrl.onSearch({q:$ctrl.q})
        }else{
          console.log('empty search');
        }
      };

      $ctrl.clear = function() {
        $ctrl.q = ''
      };

    },
  });
