'use strict';

/**
 * @ngdoc function
 * @name manageApp.controller:ActionBeianHexCtrl
 * @description
 * # ActionBeianHexCtrl
 * Controller of the manageApp
 */
angular.module('manageApp')
  .controller('ActionBeianHexCtrl', ActionBeianHexCtrl);


ActionBeianHexCtrl.$inject = ['$scope','$state','$stateParams','dataManager','beianManager'];

function ActionBeianHexCtrl($scope,$state,$stateParams,_dataManager,_beianManager){
  var vm = this;
  vm.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];
  $scope.service = _beianManager;

  vm.mode = $stateParams.mode;
  vm.canEdit = vm.mode==='beian';
  vm.canSee = _beianManager.getProduct();
  /**
   * 获取单个远程Hex文件
   * @param index
   */
  vm.getRemoteHex = function (index) {
    var localIndex = index||1;
    _dataManager.getRemoteHex(_beianManager.getProduct().id,localIndex,
      function (arraybuffer) {
        _beianManager.setHex(arraybuffer,index-1);
      });
  };
  /**
   * 获取所有远程Hex文件
   */
  vm.getRemoteHexNum = function () {
    _dataManager.getRemoteHexNum(_beianManager.getProduct().id,
      function (data) {
        var num = data.total,
          index;
        for(index = 1;index<=num;index++){
          vm.getRemoteHex(index)
        }
      }
    )
  };

  if(vm.mode==='gonghuo'){//供货模式，自动获取
    if(!_beianManager.getProduct()){
      return;
    }
    vm.getRemoteHexNum();
  }
  vm.bt0 = function () {
    $('#hexFile0').click();
  };
  vm.bt1 = function () {
    $('#hexFile1').click();
  };

  vm.removeHex = function (index) {
    _beianManager.removeHex(index);
    refreshHash();
  };

  vm.setHex = function () {
    var cpu0 = vm['hexFile'][0],
      cpu1 = vm['hexFile'][1],
      cpus = [];

    var i = 0;
    [cpu0,cpu1].map(function (item) {
      if(item){
        cpus.push(item);
        readHex(item,i);
      }
      i++;
    });

    window.setTimeout(function () {
      if(vm.hash1||vm.hash2){
        _dataManager.setRemoteHex(_beianManager.getProduct().id,cpus,function () {
          $state.go("action-beian.compare");
        });
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
    var name = file.name;
    var size = file.size;
    console.log(name+"|"+size);
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
      sendHexToManager(buffer,index,name);
    };

  };
  var sendHexToManager = function (buffer,index,name) {
    var result = _beianManager.setHex(buffer,index,name);
    if(result){
      refreshHash();
    }else{
      vm.hexFile = undefined;
    }
  };

  var refreshHash = function () {
    vm.hash1 =  _beianManager.getMd5(0);
    vm.hash2 =  _beianManager.getMd5(1);
  };

  $scope.$watch('service.getMd5(0)+service.getMd5(1)', function(newVal) {
    // console.log(" New Data", newVal);
    refreshHash();
  });

  refreshHash();//首次加载读取_beianManager的hex状态
}
