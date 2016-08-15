'use strict';

/**
 * @ngdoc function
 * @name manageApp.controller:ActionFuncCtrl
 * @description
 * # ActionFuncCtrl
 * Controller of the manageApp
 */
angular.module('manageApp')
  .controller('ActionFuncCtrl', ['$state','$stateParams', 'dataManager',function ($state,$stateParams, _dataManager) {
    var vm = this;
    vm.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    vm.choosePlan = function (item) {
      vm.currentPlan = item;
      $state.go('func.onTest');
      console.dir(item);
      var currentID = item['cases'][0];
       _R({id:currentID},function (response) {
         console.log(response);
       })

    };

  }]);
