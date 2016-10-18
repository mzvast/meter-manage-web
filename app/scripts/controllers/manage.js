'use strict';

/**
 * @ngdoc function
 * @name manageApp.controller:ManageCtrl
 * @description
 * # ManageCtrl
 * Controller of the manageApp
 */
angular.module('manageApp')
  .controller('ManageCtrl',ManageCtrl );

ManageCtrl.$inject = ['$scope','$state','$stateParams','dataManager','beianManager'];

function ManageCtrl($scope,$state,$stateParams,_dataManager,_beianManager) {
  var vm = this;
  vm.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];

  vm.category = $stateParams.category||'products';
  vm.canEdit = $stateParams.canEdit;
  vm.onCase = $stateParams.onCase;
  vm.onPlan = $stateParams.onPlan;
  vm.onCompare = $stateParams.onCompare;
  vm.mode = $stateParams.mode;//识别比对
  // console.log("vm.onCase",vm.onCase);

  /**
   * 标题配置
   */
  vm.pageResourceName = _dataManager.getResourceName(vm.category);
  vm.pageTitle = vm.pageResourceName + (vm.canEdit?"管理":"选择");
  /**
   * 页码配置
   */
  vm.currentPage = 1;
  vm.itemsPerPage = 10;
  vm.maxSize = 5; //显示的时候页码的最多个数，忽略该参数
  vm.pageChanged = function() {
    vm.get();
  };
  /**
   * 排序
   */
  vm.predicate = 'id';
  vm.reverse = true;
  vm.order = function(predicate) {
    vm.reverse = (vm.predicate === predicate) ? !vm.reverse : false;
    vm.predicate = predicate;
    vm.get();
  };
  /**
   * 搜索
   */
  vm.search = function(q) {
    if (q === undefined) {
      vm.q = "";
      vm.get();
      return;
    }
    vm.q = q;
    vm.get();
    vm.currentPage = 1;
  };
  /**
   * Tab设置
   */
  vm.setTab = function (value) {
    if (typeof value === "undefined") {
      vm.type = -1;
    }else{
      vm.type = value;
    }
    vm.get();
  };

  //////////////////
  // 列表数据模型 //
  /////////////////
  vm.model = _dataManager.getModelByName(vm.category);
  vm.formModelFrozen = _dataManager.getFrozenFormModelByName(vm.category);
  ////////////
  // 标签数据模型 //
  ////////////
  vm.tabs = vm.options = _dataManager.getTabByName(vm.category);

  //////////////
  // form数据模型 //
  //////////////
  vm.formModel = _dataManager.getFormModelByName(vm.category);

  ///////////
  // 弹窗Modal //
  ///////////
  vm.setModal = function (item) {
    vm.form = {};
    if (item === undefined) {
      vm.selectedOption = vm.options[0];
      vm.modalType = 0;
      vm.modalTitle = "新增" + vm.pageResourceName;
    } else {
      console.log(item);
      switch (vm.category){
        case 'products':{
          vm.vendors.forEach(function (inner) {
            if(item.id == inner.id){
              console.log(inner);
              vm.selectedVendor=inner;
            }
          });
          vm.form = item;
          break;
        }
        case 'vendors':{
          vm.form["vendor"] = item["name"];
          vm.form["vendor_code"] =item["code"];
          vm.form["id"] = item["id"];
          break;
        }
        default:{
          vm.form = item;
        }
      }

      vm.selectedOption = vm.options[item.type];
      vm.modalType = 1;
      vm.modalTitle = "修改" + vm.pageResourceName;
    }
  };
  ///////////////////
  // 保存时候区分是新建还是修改 //
  ///////////////////
  vm.save = function () {
    switch (vm.modalType) {
      case 0:
        vm.create();
        break;
      case 1:
        vm.update();
        break;
      default:
        return;
    }
  };

  //比对相关
  if(vm.mode==='beian'){
    vm.hideTab = true;
    vm.type = 0;
  }else if(vm.mode==='gonghuo'){
    vm.hideTab = true;
    vm.type = 1;
  }
  /**
   * 设置比对产品
   * @param item
   */
  vm.setProduct = function (item) {
    if(_beianManager.setProduct(item)){
      $state.go("action-beian.setInfo")
    }else{
      _dataManager.addNotification("danger","设置失败！");
    }
  };

  vm.get = function () {
    var queryObj = {
      current_page: vm.currentPage,
      items_per_page: vm.itemsPerPage,
      order_by: vm.predicate,
      q: vm.q,
      reverse: vm.reverse,
      type: vm.type===-1?undefined:vm.type
    };
    _dataManager.ReadListByQuery(vm.category,queryObj,function (response) {
      vm.itemList = response.data;
      vm.itemList.forEach(function (item) {
        if(item['create_date']){
          // console.log(item['create_date']) ;
          item['create_date'] = moment.utc(item['create_date']).local().format('YYYY-MM-DD');
        }
        //修复厂家名称和厂家代码的嵌套
        switch (vm.category){
          case 'products':{
            if(item.vendor&&item.vendor.name&&item.vendor.code){
              var name = item.vendor.name;
              var code = item.vendor.code;
              var vendor_id = item.vendor.id;
              item.vendor = name;
              item.vendor_code = code;
              item.vendor_id = vendor_id;
            }
            break;
          }
          default:{

          }
        }

      });
      vm.totalItems = response.total_items;
      console.log(response.data);
    });
    console.log(queryObj.type);
  };
  vm.get(); //页面第一次加载
  vm.create = function () {
    vm.form.type = vm.selectedOption?vm.selectedOption.id:undefined;
    var local_form = {};//复制和处理
    makeForm(local_form);
    // if(vm.category === "products"){
    //   delete local_form.type;
    // }
    _dataManager.CreateOne(vm.category,local_form,function (response) {
      _dataManager.addNotification("success", "新" + vm.pageResourceName + "创建成功");
      vm.get();
    });

  };

  vm.update = function () {
    vm.form.type = vm.selectedOption?vm.selectedOption.id:undefined;

    var local_form = makeForm();
    // if(vm.category === "products"){
    //   console.log(local_form);
    //   delete local_form.type;
    // }
    _dataManager.UpdateOneByID(vm.category,local_form,vm.form.id,function (response) {
      _dataManager.addNotification("success", vm.pageResourceName + vm.form.id + "修改成功");
      vm.get();
    });

  };
  vm.remove = function (id) {
    _dataManager.DeleteOneByID(vm.category, id,function (response) {
      _dataManager.addNotification("success", vm.pageResourceName + id + "删除成功");
    });
    vm.get();
  };

  function makeForm(){
    var local_form = {};
    console.log(vm.category);
    switch (vm.category){
      case 'products':{
        console.log(JSON.stringify(vm.form));
        local_form["batch"] = vm.form["batch"];
        local_form["description"] = vm.form["description"];
        local_form["model"] = vm.form["model"];
        local_form["name"] = vm.form["name"];
        local_form["vendor"] = {id:+vm.selectedVendor};
        break;
      }
      case 'vendors':{
        local_form["code"] = vm.form["vendor_code"];
        local_form["name"] = vm.form["vendor"];
        break;
      }
      // case 'requirements':{
      //   local_form = vm.form;
      //   break;
      // }
      default:{
        local_form = vm.form;
        console.log(local_form)
      }
    }
    return local_form;
  }

  function getVendors(){
    var vendors;
    var queryObj = {
      current_page: vm.currentPage,
      items_per_page: vm.itemsPerPage,
      order_by: vm.predicate,
      q: vm.q,
      reverse: vm.reverse
    };
    _dataManager.ReadListByQuery('vendors',queryObj,function (response) {
      vendors = response.data;
      vm.vendors = vendors.map(function (cur) {
        return {
          id:cur.id,
          name:cur.name
        }
      });
      console.log(vendors);
    });
  }

  getVendors();

}
