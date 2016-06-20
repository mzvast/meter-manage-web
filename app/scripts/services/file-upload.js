'use strict';

/**
 * @ngdoc service
 * @name manageApp.fileUpload
 * @description
 * # fileUpload
 * Service in the manageApp.
 */
angular.module('manageApp')
  .service('fileUpload', ['$http', function ($http) {
    var self = this;
    self.uploadFileToUrl = function (file, uploadUrl) {
      var fd = new FormData();
      fd.append('file', file);
      $http.post(uploadUrl, fd, {
        transformRequest: angular.identity,
        headers: {'Content-Type': undefined}
      })
        .success(function () {
          console.log("success");
        })
        .error(function () {
          console.log("error");
        });
    }
  }]);
