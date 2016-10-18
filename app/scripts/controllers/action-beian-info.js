'use strict';

/**
 * @ngdoc function
 * @name manageApp.controller:ActionBeianInfoCtrl
 * @description
 * # ActionBeianInfoCtrl
 * Controller of the manageApp
 */
angular.module('manageApp')
  .controller('ActionBeianInfoCtrl', ActionBeianInfoCtrl);

ActionBeianInfoCtrl.$inject = ['formManager', '$stateParams', '$state', 'dataManager', 'beianManager'];

function ActionBeianInfoCtrl(_formManager, $stateParams, $state, _dataManager, _beianManager) {
  var vm = this;
  vm.mode = $stateParams.mode;//识别比对
  vm.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];
  /////////////
  // 资源连接 //
  /////////////
  var _resource = _dataManager.getResourceByName('infos');

  var settedProduct = _beianManager.getProduct();
  var settedInfo = _beianManager.getInfo();//本地优先
  if (settedProduct) {
    vm.canEdit = true;
    if (!settedInfo) {//向服务器获取
      console.log('获取infos');
      _dataManager.getRemoteInfo(
        settedProduct.id,
        function (response) {
          vm.model = response;
          setVendorInfo();
        });

    }
  }

  function setVendorInfo() {
    vm.model.company_name = settedProduct.vendor;
    vm.model.company_code = settedProduct.vendor_code;
  }

  vm.onSubmit = function () {
    // alert(JSON.stringify(vm.model), null, 2);
    if (_beianManager.setInfo(vm.model)) {
      //上传传给服务器
      _dataManager.setRemoteInfo(
        settedProduct.id,
        vm.model,
        function () {
          $state.go("action-beian.setArg");
        })
    } else {
      _dataManager.addNotification("danger", "设置失败！");
    }
  };

  switch (vm.mode) {
    case 'beian': {

      break;
    }
    case 'gonghuo': {

    }
  }


  vm.fields = _formManager.getForm('info', vm);

  if (settedInfo) {
    vm.model = settedInfo;
  } else {
    vm.model = {
      product_id: settedProduct ? settedProduct.id : '',
      company_name: settedProduct ? settedProduct.vendor : '',
      meter_name: settedProduct ? settedProduct.name : '',
      cpu_info: {
        "protect_addr": [{}, {}],
        "reserve_addr": [{}, {}]
      }
    }
  }

}
