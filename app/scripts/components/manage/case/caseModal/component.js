/**
 * Created by mzvast on 2016/10/11.
 */
'use strict';
angular.module('manageApp')
  .component('caseModalComponent', {
    templateUrl: 'scripts/components/manage/case/caseModal/component.html',
    bindings: {
      resolve: '<',
      close: '&',
      dismiss: '&'
    },
    controller: productModalController

  });

productModalController.$inject = [];

function productModalController() {
  var $ctrl = this;

  $ctrl.$onInit = function () {
    $ctrl.editableItems = $ctrl.resolve.editableItems;
    $ctrl.title = $ctrl.resolve.title;
    $ctrl.form = $ctrl.resolve.form||{};
    $ctrl.types = $ctrl.resolve.types;
    $ctrl.envsList = $ctrl.resolve.envsList;
    $ctrl.requirementsList = $ctrl.resolve.requirementsList;

    $ctrl.tabModel = [{
      id: -1,
      name: "基本信息"
    }, {
      id: 1,
      name: "适用需求"
    }, {
      id: 2,
      name: "适用环境"
    }];

    $ctrl.activeTabId = -1;

    $ctrl.form['type'] = $ctrl.form['type']?$ctrl.form['type']:$ctrl.types[0];//form.type默认值

  };

  $ctrl.ok = function () {
    $ctrl.form['envsList'] = $ctrl.envsList.map(function (item) {
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

  }
}
