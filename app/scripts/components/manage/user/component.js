'use strict';
angular.module('manageApp')
  .component('manageUserComponent', {
    templateUrl: 'scripts/components/manage/user/component.html',
    bindings: {},
    controller: manageProductController
  });

manageProductController.$inject = ['authGuard', '$state', '$uibModal', 'userService', 'modelService', 'tabService', 'formModelService', 'notificationService'];

function manageProductController(authGuard, $state, $uibModal, userService, modelService, tabService, formModelService, notificationService)
   {
    var $ctrl = this;

    $ctrl.$onInit = function () {
      $ctrl.title = '人员管理';
      $ctrl.tableModel = modelService.get('users');
      $ctrl.tabModel = tabService.get('users');
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
      userService.getList(getQueryObj(), function (res) {
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
      userService.remove(id, function () {
        console.log('removed ', id);
        notificationService.add('success','删除人员'+id+'成功');
        refresh();
      })
    };

    $ctrl.edit = function (item) {
      console.log(item);
      (function () {
        var modalInstance = $uibModal.open({
          animation: $ctrl.animationsEnabled,
          component: 'userModalComponent',
          resolve: {
            editableItems: function () {
              return formModelService.get('users');
            },
            title: function () {
              return '修改人员';
            },
            types: function () {
              return $ctrl.tabModel.slice(1);
            },
            form: function () {
              return {
                id:item.id,
                name:item.name,
                age:item.age,
                skill:item.skill,
                exp:item.exp,
                type:{id:item.type}
              };
            }
          }
        });

        modalInstance.result.then(function (formObj) {
          formObj.type = formObj.type.id;//解码
          console.log(formObj);
          userService.update(formObj,formObj.id, function (response) {
            console.log(response);
            notificationService.add('success','修改人员成功');
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
          component: 'userModalComponent',
          resolve: {
            editableItems: function () {
              return formModelService.get('users');
            },
            types: function () {
              return $ctrl.tabModel.slice(1);
            },
            title: function () {
              return '新建人员';
            }
          }
        });

        modalInstance.result.then(function (formObj) {
          formObj.type = formObj.type.id;//解码
          console.log(formObj);
          userService.add(formObj, function (response) {
            console.log(response);
            notificationService.add('success','新增人员成功');
            refresh();
          })
        }, function () {
          // console.info('dismissed at: ' + new Date());
        });
      })();
    };

  }

