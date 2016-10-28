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
        fileread: "="
      },
      link: function postLink(scope, element, attrs) {
        element.bind("change", function (changeEvent) {
          var reader = new FileReader();
          reader.onload = function (loadEvent) {
            scope.$apply(function () {
              // var buffer = loadEvent.target.result;
              scope.fileread = loadEvent.target.result;
              // var u8 = new Uint8Array(buffer);
              // scope.fileread = u8;
              console.log(scope.fileread);
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
