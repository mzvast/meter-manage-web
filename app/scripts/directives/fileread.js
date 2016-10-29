'use strict';

/**
 * @ngdoc directive
 * @name manageApp.directive:fileread
 * @description
 * # fileread
 */
angular.module('manageApp')
  .directive('fileread', function () {
    return {
      scope: {
        fileread: "=",
        md5:'=',
        filename:'='
      },
      link: function postLink(scope, element, attrs) {
        element.bind("change", function (changeEvent) {
          scope.filename = element[0].files[0].name;
          var reader = new FileReader();
          reader.onload = function (loadEvent) {
            scope.$apply(function () {
              // var buffer = loadEvent.target.result;
              // var u8 = new Uint8Array(buffer);
              // scope.fileread = u8;
              scope.fileread = loadEvent.target.result;
              scope.md5 = SparkMD5.ArrayBuffer.hash(loadEvent.target.result);
            });
          };
          reader.readAsArrayBuffer(changeEvent.target.files[0]);
        });

        scope.$on('$destory', function(){
          element.unbind("change");
        })
      }
    };
  });
