'use strict';

/**
 * @ngdoc function
 * @name manageApp.controller:ActionTestEncryptCtrl
 * @description
 * # ActionTestEncryptCtrl
 * Controller of the manageApp
 */
angular.module('manageApp')
  .controller('ActionTestEncryptCtrl', ['fileUpload', function (fileUpload) {
    var self = this;
    self.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    self.uploadFile = function () {
      var file = self.myFile;
      console.log('file is ');
      console.dir(file);
      var uploadUrl = "/api/v2/hex";
      fileUpload.uploadFileToUrl(file, uploadUrl);
    };
  }]);
