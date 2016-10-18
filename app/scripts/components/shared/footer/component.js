/**
 * Created by mzvast on 2016/10/12.
 */
'use strict';
angular.module('manageApp')
  .component('footerComponent', {
    templateUrl: 'scripts/components/shared/footer/component.html',
    bindings: {

    },
    controller: footerController
  });

footerController.$inject = ['authGuard','$state'];

function footerController(authGuard,$state) {
  var $ctrl = this;

  $ctrl.$onInit = function () {
    $ctrl.style = "";
  };

  //根据登录状态改变footer容器样式，可能会影响性能 TODO
  $ctrl.$doCheck= function () {
    $ctrl.style = authGuard.isLoggedIn?"main-footer":"";
  };


}
