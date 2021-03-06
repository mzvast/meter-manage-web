/**
 * Created by mzvast on 2016/10/12.
 */
'use strict';
angular.module('manageApp')
  .component('contentComponent', {
    templateUrl: 'scripts/components/shared/content/component.html',
    bindings: {},
    controller: contentController
  });

contentController.$inject = ['authGuard', '$state'];

function contentController(authGuard, $state) {
  var $ctrl = this;
  $ctrl.authGuard = authGuard.isLoggedIn;

  $ctrl.$onInit = function () {
    $ctrl.style = "login-page";
  };

  //根据登录状态改变content容器样式，可能会影响性能 TODO
  $ctrl.$doCheck = function () {
    $ctrl.style = authGuard.isLoggedIn ? "content-wrapper" : "login-page";
  };


}
