'use strict';
angular.module('manageApp')
  .component('manageCaseComponent', {
    templateUrl: 'scripts/components/manage/case/component.html',
    bindings: {},
    controller: manageProductController
  });

manageProductController.$inject = ['authGuard', '$state', '$uibModal', 'caseService', 'modelService', 'tabService', 'formModelService', 'notificationService'];

function manageProductController(authGuard, $state, $uibModal, caseService, modelService, tabService, formModelService, notificationService)
   {
    var $ctrl = this;

    $ctrl.$onInit = function () {
      $ctrl.title = '用例管理';
      $ctrl.tableModel = modelService.get('cases');
      $ctrl.tabModel = tabService.get('cases');
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
      caseService.getList(getQueryObj(), function (json) {
        console.log(json.data);

        $ctrl.itemList = json.data.map(function (item) {
          if (item['create_date']) {
            item['create_date'] = moment.utc(item['create_date']).local().format('YYYY-MM-DD');
          }
          // //修复用例名称和用例代码的嵌套
          // if (item.case && item.case.name && item.case.code) {
          //   var name = item.case.name;
          //   var code = item.case.code;
          //   var case_id = item.case.id;
          //   item.case = name;
          //   item.case_code = code;
          //   item.case_id = case_id;
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
      caseService.remove(id, function () {
        console.log('removed ', id);
        notificationService.add('success','删除用例'+id+'成功');
        refresh();
      })
    };

    $ctrl.edit = function (item) {
      console.log(item);
      (function () {
        var modalInstance = $uibModal.open({
          animation: $ctrl.animationsEnabled,
          component: 'caseModalComponent',
          resolve: {
            editableItems: function () {
              return formModelService.get('cases');
            },
            title: function () {
              return '修改用例';
            },
            types: function () {
              return $ctrl.tabModel;
            },
            form: function () {
              return {
                id:item.id,
                title:item.title,
                describe:item.describe,
                detail:item.detail,
                pre_condition: item.pre_condition,
                expout: item.expout,
                type:{id:item.type} //编码
              };
            },
            envsList: function () {
              return item.envsList.slice(0);
            },
            requirementsList: function () {
              return item.requirementsList.slice(0);
            }
          }
        });

        modalInstance.result.then(function (formObj) {//TODO 如何保存
          formObj.type = formObj.type.id;//解码
          console.log(formObj);
          var formId = formObj.id;
          delete formObj.id;
          caseService.update(formObj,formId, function (response) {
            console.log(response);
            notificationService.add('success','修改用例成功');
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
          component: 'caseModalComponent',
          resolve: {
            editableItems: function () {
              return formModelService.get('cases');
            },
            types: function () {
              return $ctrl.tabModel;
            },
            title: function () {
              return '新建用例';
            }
          }
        });

        modalInstance.result.then(function (formObj) {
          formObj.type = formObj.type.id;//解码
          console.log(formObj);
          caseService.add(formObj, function (response) {
            console.log(response);
            notificationService.add('success','新增用例成功');
            refresh();
          })
        }, function () {
          // console.info('dismissed at: ' + new Date());
        });
      })();
    };

  }

