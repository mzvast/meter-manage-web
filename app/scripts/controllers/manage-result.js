'use strict';

/**
 * @ngdoc function
 * @name manageApp.controller:ManageResultCtrl
 * @description
 * # ManageResultCtrl
 * Controller of the manageApp
 */
angular.module('manageApp')
  .controller('ManageResultCtrl', ['$scope','$state','$stateParams','dataManager','beianManager',function ($scope,$state,$stateParams,_dataManager,_beianManager) {
    var vm = this;
    vm.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    vm.pageResourceName = '结果';
    vm.pageType = '管理';
    vm.pageTitle = '结果' + vm.pageType;

    _dataManager.pageInit(vm.pageResourceName,vm.pageType,vm);


  }]);
