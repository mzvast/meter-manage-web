'use strict';
angular.module('manageApp')
  .component('manageProductComponent', {
    templateUrl: 'scripts/components/manage/product/component.html',
    bindings: {},
    controller: function (authGuard, $state, $uibModal, productService, modelService, tabService, formModelService, notificationService) {
      var $ctrl = this;

      $ctrl.$onInit = function () {
        $ctrl.tableModel = modelService.get('products');
        $ctrl.tabModel = tabService.get('products');
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
        productService.getList(getQueryObj(), function (json) {
          console.log(json.data);

          $ctrl.itemList = json.data.map(function (item) {
            if (item['create_date']) {
              item['create_date'] = moment.utc(item['create_date']).local().format('YYYY-MM-DD');
            }
            //修复厂家名称和厂家代码的嵌套
            if (item.vendor && item.vendor.name && item.vendor.code) {
              var name = item.vendor.name;
              var code = item.vendor.code;
              var vendor_id = item.vendor.id;
              item.vendor = name;
              item.vendor_code = code;
              item.vendor_id = vendor_id;
            }
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

      $ctrl.remove = function (id) {
        productService.remove(id, function () {
          console.log('removed ', id);
          notificationService.add('success','删除产品'+id+'成功');
          refresh();
        })
      };

      $ctrl.edit = function (item) {
        console.log(item);
        (function () {
          var modalInstance = $uibModal.open({
            animation: $ctrl.animationsEnabled,
            component: 'productModalComponent',
            resolve: {
              editableItems: function () {
                return formModelService.get('products');
              },
              title: function () {
                return '修改产品';
              },
              form: function () {
                return {
                  id:item.id,
                  name:item.name,
                  batch:item.batch,
                  description:item.description,
                  vendor:{id:item.vendor_id,name:item.name}
                };
              }
            }
          });

          modalInstance.result.then(function (formObj) {
            console.log(formObj);
            productService.update(formObj,formObj.id, function (response) {
              console.log(response);
              notificationService.add('success','修改产品成功');
              refresh();
            })
          }, function () {
            console.info('dismissed at: ' + new Date());
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
            component: 'productModalComponent',
            resolve: {
              editableItems: function () {
                return formModelService.get('products');
              },
              title: function () {
                return '新建产品';
              }
            }
          });

          modalInstance.result.then(function (formObj) {
            console.log(formObj);
            productService.add(formObj, function (response) {
              console.log(response);
              notificationService.add('success','新增产品成功');
              refresh();
            })
          }, function () {
            console.info('dismissed at: ' + new Date());
          });
        })();
      };

    }
  });
