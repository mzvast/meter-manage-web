'use strict';

/**
 * @ngdoc function
 * @name manageApp.controller:ActionTestCompareCtrl
 * @description
 * # ActionTestCompareCtrl
 * Controller of the manageApp
 */
angular.module('manageApp')
  .controller('ActionTestCompareCtrl', ['wsManager', function (wsManager) {
    var self = this;
    var ws;
    self.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    self.doCompare = function () {
      self.ws = ws = wsManager.Messages();
      ws.send("hehe");
    };
  }]);
