'use strict';

/**
 * @ngdoc function
 * @name manageApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the manageApp
 */
angular.module('manageApp')
  .controller('LoginCtrl', LoginCtrl);

LoginCtrl.$inject = [];

function LoginCtrl() {
  this.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];
}
