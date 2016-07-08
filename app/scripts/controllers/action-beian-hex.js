'use strict';

/**
 * @ngdoc function
 * @name manageApp.controller:ActionBeianHexCtrl
 * @description
 * # ActionBeianHexCtrl
 * Controller of the manageApp
 */
angular.module('manageApp')
  .controller('ActionBeianHexCtrl', ['$state','dataManager','beianManager', function ($state,_dataManager,_beianManager){
    var vm = this;
    vm.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    vm.selectFile = function () {
      var elem = $("#hexFile");
      if(elem){
        elem.click();
      }
    };

    vm.setHex = function () {

      if(vm.hexFile===undefined){
        return;
      }
      var file = vm.hexFile;
      console.log(file.size);
      var reader = new FileReader();
      reader.readAsArrayBuffer(file);
      // reader.readAsBinaryString(file);
      //    reader.readAsText(file);
      //文件读取完毕后该函数响应
      reader.onload = function (evt) {
        var buffer = evt.target.result;
        // console.log(evt.target.result);
        // Handle UTF-16 file dump
        var u8 = new Uint8Array(buffer);

        if(_beianManager.setHex(buffer,0)){
            $state.go("action-beian.compare");
        }else{
          _dataManager.addNotification("danger","暂存失败！请重试！");
          vm.hexFile = undefined;
        }
      };
    }
  }]);
