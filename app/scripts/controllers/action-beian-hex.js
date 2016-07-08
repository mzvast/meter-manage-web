'use strict';

/**
 * @ngdoc function
 * @name manageApp.controller:ActionBeianHexCtrl
 * @description
 * # ActionBeianHexCtrl
 * Controller of the manageApp
 */
angular.module('manageApp')
  .controller('ActionBeianHexCtrl', ['$scope','$state','dataManager','beianManager', function ($scope,$state,_dataManager,_beianManager){
    var vm = this;
    vm.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $('#button1').on('click',function () {
      $('#hexFile0').click()
    });
    $('#button2').on('click',function () {
      $('#hexFile1').click()
    });

    vm.setHex = function () {
      var cpu0 = vm['hexFile'][0],
          cpu1 = vm['hexFile'][1];

      readHex(cpu0,0);
      readHex(cpu1,1);

      window.setTimeout(function () {
        if(vm.hash1||vm.hash2){
          $state.go("action-beian.compare");
        }else{
          _dataManager.addNotification("warning","请至少选择一个hex文件")
        }
      },500);

    };

    var readHex = function (model,index) {
      if(!model){
        return;
      }
      var file = model;
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
        sendHexToManager(buffer,index);
      };

      var sendHexToManager = function (buffer,index) {
        var result = _beianManager.setHex(buffer,index);
        if(result){
          $scope.$apply(refreshHash());
        }else{
          vm.hexFile = undefined;
        }
      };

      var refreshHash = function () {
        vm.hash1 =  _beianManager.getMd5(0);
        vm.hash2 =  _beianManager.getMd5(1);
      }
    }
  }]);
