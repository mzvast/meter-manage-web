'use strict';

/**
 * @ngdoc function
 * @name manageApp.controller:ActionFuncCtrl
 * @description
 * # ActionFuncCtrl
 * Controller of the manageApp
 */
angular.module('manageApp')
  .controller('ActionFuncCtrl',ActionFuncCtrl );

ActionFuncCtrl.$inject = ['$state','$stateParams', 'dataManager'];

function ActionFuncCtrl($state,$stateParams, _dataManager) {
  var vm = this;
  vm.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];
  vm.cases = [];

  vm.choosePlan = function (item) {
    vm.cases = [];
    vm.currentPlan = item;
    console.log("plan id = ",item.id);
    $state.go('func.onTest');
    console.log("clicked item = ",item);
    var casesList = item.casesList;
    console.log(casesList);
    /*获取所选plan中case列表的详情*/
    casesList.forEach(function (caseEntity) {
      console.log('caseEntity===?===',caseEntity);
      _dataManager.ReadOneById('cases',caseEntity.id,function (response) {
        var caseItem = response.data;
        console.log(caseItem);
        vm.cases.push({
          id:caseEntity.id,
          content:caseItem,
          record:'',
          pass:false
        });
        vm.setCase(0);
      });
    })
  };

  vm.setCase = function (index) {
    vm.currentCase = vm.cases[index];
  };
  vm.fire = function () {
    var results = [];
    vm.cases.forEach(function (caseItem) {
      results.push({caseId:caseItem.id,pass:caseItem.pass?1:0,record:caseItem.record});
    });
    console.log(results);
    _dataManager.setRemoteResult(vm.currentPlan.id,results,function (response) {
      _dataManager.addNotification("success", "结果上传成功！");
      $state.go("func.onPlan");
    })
  }

}
