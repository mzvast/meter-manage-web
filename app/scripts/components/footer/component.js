/**
 * Created by mzvast on 2016/10/12.
 */
'use strict';
angular.module('manageApp')
  .component('footerComponent', {
    templateUrl: 'scripts/components/footer/component.html',
    bindings: {

    },
    controller: function(authGuard,$state) {
      var $ctrl = this;

      $ctrl.$onInit = function () {
        $ctrl.style = "";
      };

      //根据登录状态改变footer容器样式，可能会影响性能 TODO
      $ctrl.$doCheck= function () {
        $ctrl.style = authGuard.isLoggedIn?"main-footer":"";
      };


    },
  });
