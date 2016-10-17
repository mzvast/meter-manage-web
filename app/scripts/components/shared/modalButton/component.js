/**
 * Created by mzvast on 2016/10/11.
 */
'use strict';
angular.module('manageApp')
  .component('modalButtonComponent', {
    templateUrl: 'scripts/components/shared/modalButton/component.html',
    bindings: {
      onClick:'&',
      name:'@'
    },
    controller: function($document) {
      var $ctrl = this;
      $ctrl.click = function () {
        $ctrl.onClick();
      }
    },
  });
