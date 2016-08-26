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

    var pageResourceName = '结果';
    var pageType = '分析';
    vm.pageTitle = pageResourceName + pageType;


  }]);
