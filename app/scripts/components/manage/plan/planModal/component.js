/**
 * Created by mzvast on 2016/10/11.
 */
'use strict';
angular.module('manageApp')
  .component('planModalComponent', {
    templateUrl: 'scripts/components/manage/plan/planModal/component.html',
    bindings: {
      resolve: '<',
      close: '&',
      dismiss: '&'
    },
    controller: planModalController

  });

planModalController.$inject = [];

function planModalController() {
  var $ctrl = this;

  $ctrl.$onInit = function () {
    $ctrl.editableItems = $ctrl.resolve.editableItems;
    $ctrl.title = $ctrl.resolve.title;
    $ctrl.form = $ctrl.resolve.form||{};
    $ctrl.types = $ctrl.resolve.types;
    $ctrl.form['type'] = $ctrl.form['type']?$ctrl.form['type']:$ctrl.types[0];//form.type默认值
    $ctrl.casesList = $ctrl.resolve.casesList;
    $ctrl.envsList = $ctrl.resolve.envsList;
    $ctrl.executor = $ctrl.resolve.executor;
    $ctrl.productsList = $ctrl.resolve.productsList;
    $ctrl.requirementsList = $ctrl.resolve.requirementsList;

    $ctrl.tabModel = [{
      id: -1,
      name: "基本信息"
    }, {
      id: 1,
      name: "需求"
    }, {
      id: 2,
      name: "环境"
    },{
      id: 3,
      name: "产品"
    },{
      id: 4,
      name: "用例"
    },{
      id: 5,
      name: "测试员"
    }];

    $ctrl.activeTabId = -1;
  };

  $ctrl.ok = function () {
    $ctrl.form['casesList'] = $ctrl.casesList.map(function (item) {
      return {id:item.id}
    });
    $ctrl.form['envsList'] = $ctrl.envsList.map(function (item) {
      return {id:item.id}
    });
    $ctrl.form['executor'] = $ctrl.executor.map(function (item) {
      return {id:item.id}
    });
    $ctrl.form['productsList'] = $ctrl.productsList.map(function (item) {
      return {id:item.id}
    });
    $ctrl.form['requirementsList'] = $ctrl.requirementsList.map(function (item) {
      return {id:item.id}
    });
    $ctrl.close({$value: $ctrl.form});
  };

  $ctrl.cancel = function () {
    $ctrl.dismiss({$value: 'cancel'});
  };

  $ctrl.selectTab = function(id){
    $ctrl.activeTabId = id;
  };

  $ctrl.addToEnv = function (item) {
    if($ctrl.envsList.map(function (thing) {
        return thing.id;
      }).indexOf(item.id)===-1){

      $ctrl.envsList.push(item);
      console.log(item);
      console.log($ctrl.envsList.length);
    }else{
      console.log('item 已存在');
    }

  };

  $ctrl.addToReq = function (item) {
    if($ctrl.requirementsList.map(function (thing) {
        return thing.id;
      }).indexOf(item.id)===-1){

      $ctrl.requirementsList.push(item);
      console.log(item);
      console.log($ctrl.requirementsList.length);
    }else{
      console.log('item 已存在');
    }
  };

  $ctrl.addToProduct = function (item) {
    if($ctrl.productsList.map(function (thing) {
        return thing.id;
      }).indexOf(item.id)===-1){

      $ctrl.productsList.push(item);
      console.log(item);
      console.log($ctrl.productsList.length);
    }else{
      console.log('item 已存在');
    }
  };

  $ctrl.addToCase = function (item) {
    if($ctrl.casesList.map(function (thing) {
        return thing.id;
      }).indexOf(item.id)===-1){

      $ctrl.casesList.push(item);
      console.log(item);
      console.log($ctrl.casesList.length);
    }else{
      console.log('item 已存在');
    }
  };

  $ctrl.addToExcutor = function (item) {
    if($ctrl.executor.length===0){
      $ctrl.executor.push(item);
      console.log(item);
    }else{
      console.log('item 已存在');
    }
  }
}
