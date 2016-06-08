'use strict';

/**
 * @ngdoc function
 * @name manageApp.controller:FormCtrl
 * @description
 * # FormCtrl
 * Controller of the manageApp
 */
angular.module('manageApp')
  .controller('FormCtrl', ['formManager','$stateParams', function (formManager,$stateParams) {
    var vm = this;
    vm.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    console.log("进入form.js",$stateParams.fid);

    vm.onSubmit = onSubmit;

    vm.model = {
      createDate: Date.now()
    };

    vm.fields = formManager.getForm($stateParams.fid, vm);

    // function definition
    function onSubmit() {
      alert(JSON.stringify(vm.model), null, 2);
    }
  }]);
