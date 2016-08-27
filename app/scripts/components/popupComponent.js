/**
 * Created by mzvast on 2016/8/27.
 */
'use strict';
angular.module('manageApp')
  .component('popupComponent', {
    templateUrl: 'scripts/components/popupComponent.html',
    bindings: {
      title:'<',
      body:'<'
    },
    controller: function(dataManager,$uibModal,$document) {
      var $ctrl = this;

    },
  });
