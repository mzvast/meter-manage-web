'use strict';

/**
 * @ngdoc function
 * @name manageApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the manageApp
 */
angular.module('manageApp')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = [];

function MainCtrl() {
  this.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];
}
