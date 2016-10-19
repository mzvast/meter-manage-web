'use strict';
angular.module('manageApp')
  .component('manageRequirementComponent', {
    templateUrl: 'scripts/components/manage/requirement/component.html',
    bindings: {},
    controller: manageProductController
  });

manageProductController.$inject = ['authGuard', '$state', '$uibModal', 'requirementService', 'modelService', 'tabService', 'formModelService', 'notificationService'];

function manageProductController(authGuard, $state, $uibModal, requirementService, modelService, tabService, formModelService, notificationService)
   {
    var $ctrl = this;

    $ctrl.$onInit = function () {
      $ctrl.title = '需求管理';
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
          // //修复需求名称和需求代码的嵌套
          // if (item.requirement && item.requirement.name && item.requirement.code) {
          //   var name = item.requirement.name;
          //   var code = item.requirement.code;
          //   var requirement_id = item.requirement.id;
          //   item.requirement = name;
          //   item.requirement_code = code;
          //   item.requirement_id = requirement_id;
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

    $ctrl.remove = function (id) {
      requirementService.remove(id, function () {
        console.log('removed ', id);
        notificationService.add('success','删除需求'+id+'成功');
        refresh();
      })
    };

    $ctrl.edit = function (item) {
      console.log(item);
      (function () {
        var modalInstance = $uibModal.open({
          animation: $ctrl.animationsEnabled,
          component: 'requirementModalComponent',
          resolve: {
            editableItems: function () {
              return formModelService.get('requirements');
            },
            title: function () {
              return '修改需求';
            },
            form: function () {
              return {
                id:item.id,
                title:item.title,
                detail:item.detail,
                describe:item.describe,
                type:{id:item.type} //编码
              };
            }
          }
        });

        modalInstance.result.then(function (formObj) {
          formObj.type = formObj.type.id;//解码
          console.log(formObj);
          requirementService.update(formObj,formObj.id, function (response) {
            console.log(response);
            notificationService.add('success','修改需求成功');
            refresh();
          })
        }, function () {
          // console.info('dismissed at: ' + new Date());
        });
      })()
    };

    $ctrl.selectTab = function (id) {
      console.log(id);
      $ctrl.type = id===undefined?-1:id;
      refresh();
    };

    $ctrl.create = function () {
      (function () {
        var modalInstance = $uibModal.open({
          animation: $ctrl.animationsEnabled,
          component: 'requirementModalComponent',
          resolve: {
            editableItems: function () {
              return formModelService.get('requirements');
            },
            title: function () {
              return '新建需求';
            }
          }
        });

        modalInstance.result.then(function (formObj) {
          formObj.type = formObj.type.id;//解码
          console.log(formObj);
          requirementService.add(formObj, function (response) {
            console.log(response);
            notificationService.add('success','新增需求成功');
            refresh();
          })
        }, function () {
          // console.info('dismissed at: ' + new Date());
        });
      })();
    };

  }

