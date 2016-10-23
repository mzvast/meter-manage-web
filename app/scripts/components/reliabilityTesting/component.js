'use strict';
angular.module('manageApp')
  .component('reliabilityTestingComponent', {
    templateUrl: 'scripts/components/reliabilityTesting/component.html',
    bindings: {},
    controller: reliabilityTestingController
  });

reliabilityTestingController.$inject = ['reliabilityTestingService','authGuard', '$state', '$uibModal', 'planService', 'modelService', 'tabService', 'formModelService', 'notificationService'];

function reliabilityTestingController(reliabilityTestingService,authGuard, $state, $uibModal, planService, modelService, tabService, formModelService, notificationService)
{
  var $ctrl = this;

  $ctrl.$onInit = function () {
    $ctrl.title = '可靠性测试执行';
    $ctrl.tableModel = modelService.get('plans');
    $ctrl.tabModel = tabService.get('plans');
    $ctrl.itemList = [];

    $ctrl.totalItems = 1;
    $ctrl.currentPage = 1;
    $ctrl.maxSize = 5;
    $ctrl.itemsPerPage = 10;

    $ctrl.predicate = 'id';
    $ctrl.q = '';
    $ctrl.reverse = false;
    $ctrl.type = 0;//未完成计划


    refresh();
  };

  function getQueryObj() {
    return {
      current_page: $ctrl.currentPage,
      items_per_page: $ctrl.itemsPerPage,
      order_by: $ctrl.predicate,
      q: $ctrl.q,
      reverse: $ctrl.reverse,
      type: $ctrl.type === -1 ? undefined : $ctrl.type
    };
  }

  function refresh() {
    planService.getList(getQueryObj(), function (json) {
      console.log(json.data);

      $ctrl.itemList = json.data.map(function (item) {
        if (item['create_date']) {
          item['create_date'] = moment.utc(item['create_date']).local().format('YYYY-MM-DD');
        }
        //fix nest creator name/id
        item.creator_id = item.creator.id;
        item.creator = item.creator.name;
        return item;
      });
      $ctrl.totalItems = json.total_items;
      $ctrl.currentPage = json.current_page;
    });
  }


  $ctrl.pageChanged = function () {
    refresh();
    console.log($ctrl.currentPage)
  };

  $ctrl.order = function (key) {
    if ($ctrl.predicate === key) {
      $ctrl.reverse = !$ctrl.reverse;
    } else {
      $ctrl.predicate = key;
    }
    refresh();
    console.log("ordered by " + key)
  };

  $ctrl.animationsEnabled = true;

  $ctrl.search = function (q) {
    console.log('searching for ', q);
    $ctrl.q = q;
    refresh();
  };

  $ctrl.clear = function () {
    $ctrl.q = '';
    refresh();
  };

  $ctrl.action = function (item) {
    reliabilityTestingService.setPlan(item);
    $state.go("reliabilityTesting.do");
  };




}

