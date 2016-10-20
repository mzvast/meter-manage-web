'use strict';
angular.module('manageApp')
  .component('managePlanComponent', {
    templateUrl: 'scripts/components/manage/plan/component.html',
    bindings: {},
    controller: managePlanController
  });

managePlanController.$inject = ['authGuard', '$state', '$uibModal', 'planService', 'modelService', 'tabService', 'formModelService', 'notificationService'];

function managePlanController(authGuard, $state, $uibModal, planService, modelService, tabService, formModelService, notificationService)
   {
    var $ctrl = this;

    $ctrl.$onInit = function () {
      $ctrl.title = '计划管理';
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

    $ctrl.remove = function (id) {
      planService.remove(id, function () {
        console.log('removed ', id);
        notificationService.add('success','删除计划'+id+'成功');
        refresh();
      })
    };

    $ctrl.edit = function (item) {
      console.log(item);
      (function () {
        var modalInstance = $uibModal.open({
          animation: $ctrl.animationsEnabled,
          component: 'planModalComponent',
          resolve: {
            editableItems: function () {
              return formModelService.get('plans');
            },
            title: function () {
              return '修改计划';
            },
            types: function () {
              return $ctrl.tabModel.slice(1);
            },
            form: function () {
              return {
                id:item.id,
                title:item.title,
                // creator:{id:item.creator_id},
                type:{id:item.type} //编码
              };
            },
            casesList: function () {
              return item.casesList.slice(0);
            },
            envsList: function () {
              return item.envsList.slice(0);
            },
            executor: function () {
              return item.executor.slice(0);
            },
            productsList: function () {
              return item.productsList.slice(0);
            },
            requirementsList: function () {
              return item.requirementsList.slice(0);
            }
          }
        });

        modalInstance.result.then(function (formObj) {//保存修改
          formObj.type = formObj.type.id;//解码
          console.log(formObj);
          var formId = formObj.id;
          delete formObj.id;
          planService.update(formObj,formId, function (response) {
            console.log(response);
            notificationService.add('success','修改计划成功');
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
          component: 'planModalComponent',
          resolve: {
            editableItems: function () {
              return formModelService.get('plans');
            },
            types: function () {
              return $ctrl.tabModel.slice(1);
            },
            title: function () {
              return '新建计划';
            },
            form: function () {
              return {
                title:"计划 "+ moment.utc().local().format('YYYY-MM-DD h:mm:ss a')
                // creator:{id:123}
              };
            },
            casesList: function () {
              return [];
            },
            envsList: function () {
              return [];
            },
            executor: function () {
              return [];
            },
            productsList: function () {
              return [];
            },
            requirementsList: function () {
              return [];
            }
          }
        });

        modalInstance.result.then(function (formObj) {//保存新增
          formObj.type = formObj.type.id;//解码
          console.log(formObj);
          planService.add(formObj, function (response) {
            console.log(response);
            notificationService.add('success','新增计划成功');
            refresh();
          })
        }, function () {
          // console.info('dismissed at: ' + new Date());
        });
      })();
    };

  }

