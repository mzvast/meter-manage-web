/**
 * Created by mzvast on 2016/8/27.
 */
'use strict';
angular.module('manageApp')
  .component('popupComponent', {
    templateUrl: 'scripts/components/shared/popup/component.html',
    bindings: {
      title:'<',
      steps:'<',
      record:'<',
      close:'&'
    },
    controller: function(dataManager,$uibModal,$document) {
      var $ctrl = this;

      $ctrl.closeModal = function () {
        $ctrl.close();
      }

    },
  });
