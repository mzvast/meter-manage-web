'use strict';
angular.module('manageApp')
  .component('manageProductComponent', {
    templateUrl: 'scripts/components/manage/product/component.html',
    bindings: {

    },
    controller: function(authGuard,$state,$uibModal) {
      var $ctrl = this;

      $ctrl.items = ['item1', 'item2', 'item3'];

      $ctrl.animationsEnabled = true;

      $ctrl.search = function (q) {
        console.log('searching for ',q)
      };

      $ctrl.openModal = function () {
        var modalInstance = $uibModal.open({
          animation: $ctrl.animationsEnabled,
          component: 'modalComponent',
          resolve: {
            items: function () {
              return $ctrl.items;
            }
          }
        });

        modalInstance.result.then(function (selectedItem) {
          $ctrl.selected = selectedItem;
        }, function () {
          console.info('modal-component dismissed at: ' + new Date());
        });
      };

    },
  });
