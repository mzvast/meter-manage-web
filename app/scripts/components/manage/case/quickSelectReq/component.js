/**
 * Created by mzvast on 2016/10/11.
 */
'use strict';
angular.module('manageApp')
  .component('quickSelectReqComponent', {
    templateUrl: 'scripts/components/manage/case/quickSelectReq/component.html',
    bindings: {
      onAdd: '&'
    },
    controller: quickSelectReq
  });

quickSelectReq.$inject = ['requirementService','modelService','tabService'];

function quickSelectReq(requirementService,modelService,tabService) {
  var $ctrl = this;

  $ctrl.$onInit = function () {
    $ctrl.tableModel = modelService.get('requirements');
    $ctrl.tabModel = tabService.get('requirements');
    $ctrl.itemList = [];

    $ctrl.totalItems = 1;
    $ctrl.currentPage = 1;
    $ctrl.maxSize = 5;
    $ctrl.itemsPerPage = 10;

    $ctrl.predicate = 'id';
    $ctrl.q = '';
    $ctrl.reverse = false;
    $ctrl.type = -1;

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
    requirementService.getList(getQueryObj(), function (json) {
      console.log(json.data);

      $ctrl.itemList = json.data.map(function (item) {
        if (item['create_date']) {
          item['create_date'] = moment.utc(item['create_date']).local().format('YYYY-MM-DD');
        }
        // //修复环境名称和环境代码的嵌套
        // if (item.env && item.env.name && item.env.code) {
        //   var name = item.env.name;
        //   var code = item.env.code;
        //   var env_id = item.env.id;
        //   item.env = name;
        //   item.env_code = code;
        //   item.env_id = env_id;
        // }
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

  $ctrl.selectTab = function (type) {
    // console.log("type:"+type);
    $ctrl.type = type;
    refresh();
  };

  $ctrl.add = function (item) {
    $ctrl.onAdd({item:item});
  };




}
