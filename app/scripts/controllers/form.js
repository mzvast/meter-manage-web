'use strict';

/**
 * @ngdoc function
 * @name manageApp.controller:FormCtrl
 * @description
 * # FormCtrl
 * Controller of the manageApp
 */
angular.module('manageApp')
  .controller('FormCtrl', ['formManager', '$stateParams' ,'$state',function (formManager, $stateParams,$state) {
    var vm = this;
    vm.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    // console.log("进入form.js",$stateParams.fid);

    vm.onSubmit = onSubmit;

    switch ($stateParams.fid) {
      case "contract":
      {
        console.log("contract");
        vm.model = {
          createDate: Date.now(),
          items:{
          }
        };
        break;
      }
      case "apply":
      case "supplier":
      default:
      {
        console.log("hello");
        vm.model = {
          createDate: Date.now()
        };
      }
    }


    vm.fields = formManager.getForm($stateParams.fid, vm);

    // function definition
    function onSubmit() {
      console.log($stateParams.fid=== "apply");
      switch ($stateParams.fid){
        case "apply":
        {
          $state.go(".",{fid:"supplier"});
          break;
        }
        case "supplier":
        {
          $state.go(".",{fid:"contract"});
          break;
        }
        case "contract":
        default:
        {
          alert(JSON.stringify(vm.model), null, 2);
        }
      }
    }
  }]);
