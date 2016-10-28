'use strict';
angular.module('manageApp')
  .component('manageEnvComponent', {
    templateUrl: 'scripts/components/manage/env/component.html',
    bindings: {},
    controller: manageProductController
  });

manageProductController.$inject = ['authGuard', '$state', '$uibModal', 'envService', 'modelService', 'tabService', 'formModelService', 'notificationService'];

function manageProductController(authGuard, $state, $uibModal, envService, modelService, tabService, formModelService, notificationService)
   {
    var $ctrl = this;

    $ctrl.$onInit = function () {
      $ctrl.title = '环境管理';
      $ctrl.tableModel = modelService.get('envs');
      $ctrl.tabModel = tabService.get('envs');
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
      envService.getList(getQueryObj(), function (res) {
        console.log(res);

        $ctrl.itemList = res.itemList;
        $ctrl.totalItems = res.total_items;
        $ctrl.currentPage = res.current_page;
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
      envService.remove(id, function () {
        console.log('removed ', id);
        notificationService.add('success','删除环境'+id+'成功');
        refresh();
      })
    };

    $ctrl.edit = function (item) {
      console.log(item);
      (function () {
        var modalInstance = $uibModal.open({
          animation: $ctrl.animationsEnabled,
          component: 'envModalComponent',
          resolve: {
            editableItems: function () {
              return formModelService.get('envs');
            },
            title: function () {
              return '修改环境';
            },
            types: function () {
              return $ctrl.tabModel.slice(1);
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
          envService.update(formObj,formObj.id, function (response) {
            console.log(response);
            notificationService.add('success','修改环境成功');
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
          component: 'envModalComponent',
          resolve: {
            editableItems: function () {
              return formModelService.get('envs');
            },
            types: function () {
              return $ctrl.tabModel.slice(1);
            },
            title: function () {
              return '新建环境';
            }
          }
        });

        modalInstance.result.then(function (formObj) {
          formObj.type = formObj.type.id;//解码
          console.log(formObj);
          envService.add(formObj, function (response) {
            console.log(response);
            notificationService.add('success','新增环境成功');
            refresh();
          })
        }, function () {
          // console.info('dismissed at: ' + new Date());
        });
      })();
    };

  }

