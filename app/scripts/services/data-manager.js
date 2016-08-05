'use strict';

/**
 * @ngdoc service
 * @name manageApp.dataManager
 * @description
 * # dataManager
 * Service in the manageApp.
 */
angular.module('manageApp')
  .service('dataManager', ['$http', '$resource', function ($http, $resource) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var self = this;

    self.pdfMake = function (docDef) {
      return $http.post("/node/pdf", docDef, {responseType: 'arraybuffer'});
    };

    //////////////////
    //notifications //
    //////////////////
    self.notifications = [];
    self.addNotification = function (type, message) {
      self.notifications.push({"type": type, "message": message});
    };
    self.getNotifications = function () {
      return self.notifications;
    };
    self.removeNotification = function (index) {
      self.notifications.splice(index, 1);
    };

    self.getResourceByName = function (name) {
      return self[name];
    };

    //////////////////////////
    // Resource 构造函数 //
    //////////////////////////
    [
      'products',
      'users',
      'requirements',
      'envs',
      'plans',
      'flaws',
      'infos'
    ].map(function (elem) {
      var url = '/api/v2/' + elem + '/:id';
      self[elem] = $resource(url, {
        id: '@id'
      }, {
        update: {
          method: 'PUT'
        }
      });
    });
    /**
     * 获取产品详细信息
     * @param id
     * @param cb
       */
    self.getRemoteInfo = function (id,cb) {
      self['infos'].get({
        id:id
      }).$promise
        .then(function (response) {
          console.log("获取" + 'info' + " SUCCESS!");

          // console.dir(response);
          // console.dir(response.json);
          cb(response)
        });
    };
    /**
     * 设置产品详细信息
     * @param id
     * @param data
     * @param cb
       */
    self.setRemoteInfo = function (id,data,cb) {
      self['infos'].save({
        id: id
      }, {"json": data}).$promise
        .then(function () {
          console.log("新增资源 SUCCESS!");
          // console.log(data);
          self.addNotification("success", "新" + 'info详细信息' + "创建成功");
          cb();
        });
    };

    self.setRemoteHex = function (id,fileArray,cb) {
      var uploadUrl = '/api/v2/hex/'+ id;
      var fd = new FormData();
      var i;
      for(i=0;i<fileArray.length;i++)
      {
        fd.append(i+1, fileArray[i]);
      }
      $http.post(uploadUrl, fd, {
        transformRequest: angular.identity,
        headers: {'Content-Type': undefined}
      })
        .success(function(){
          cb();
        })
        .error(function(){
        });
    };

    self.getRemoteHexNum = function (id,cb) {
      var httpPath = '/api/v2/hex/'+ id;//'/node/file';
      $http.get(httpPath)
        .success(function (data, status, headers) {
        cb(data);
      })
    };

    self.getRemoteHex = function (id,index,cb) {
      var httpPath = '/api/v2/hex/'+ id+'/'+index;//'/node/file';
      var blob;
      $http.get(httpPath,{
        responseType: 'arraybuffer'
      }).success(function (data, status, headers) {
        headers = headers();

        var filename = headers['x-filename'];
        var contentType = headers['content-type'];

        try {
          blob = new Blob([data], { type: contentType });

          var reader = new FileReader();
          reader.readAsArrayBuffer(blob);
          // reader.readAsBinaryString(file);
          //    reader.readAsText(file);
          //文件读取完毕后该函数响应
          reader.onload = function (evt) {
            var buffer = evt.target.result;
            // console.log(evt.target.result);
            // Handle UTF-16 file dump
            var u8 = new Uint8Array(buffer);
            cb(buffer);
          };
        } catch (ex) {
          console.log(ex);
        }
      }).error(function (data) {
        console.log(data);
      });
    };


    //////////////
    // CRUD构造函数 //
    //////////////
    self.R = function (resourceName, vm) {
      return function (queryObj) {
        // console.log(queryObj);
        self[resourceName].get(queryObj).$promise
          .then(function (response) {
            console.log("获取" + vm.pageResourceName + " SUCCESS!");

            // console.dir(response);
            // console.dir(response.json);
            vm.itemList = response.json;
            vm.totalItems = response.total_items;
          });
      };
    };
    self.C = function (resourceName, vm) {
      return function (formObj) {
        console.log("formObj=");
        console.log(formObj);
        self[resourceName].save({"json": formObj}).$promise
          .then(function () {
            console.log("新增资源 SUCCESS!");

            // console.log(data);
            self.addNotification("success", "新" + vm.pageResourceName + "创建成功");
            vm.get();
          });
      };
    };
    self.U = function (resourceName, vm) {
      return function (formObj) {
        console.log("formObj=");
        console.log(formObj);
        self[resourceName].update({
          id: formObj.id
        }, {"json": formObj}).$promise
          .then(function () {
            console.log("修改资源 SUCCESS!");

            // console.log(data);
            self.addNotification("success", vm.pageResourceName + formObj.id + "修改成功");
            vm.get();
          });
      };
    };
    self.D = function (resourceName, vm) {
      return function (id) {
        console.log("id=" + id);
        self[resourceName].delete({
          id: id
        }).$promise
          .then(function () {
            console.log("删除资源 SUCCESS!");

            // console.log(data);
            self.addNotification("success", vm.pageResourceName + id + "删除成功");
            vm.get();
          });
      };
    };

    self.getModelByName = function (name) {
      switch (name) {
        case 'products': {
          return {
            id: "ID",
            name: "名称",
            model:"型号",
            batch: "批次",
            vendor: "供应商",
            description: "描述",
            create_date: "创建时间"
          };
        }
        case 'users':
          return {
            id: "ID",
            name: "名称",
            age: "年龄",
            skill: "技能",
            exp: "经验",
            create_date: "创建时间"
          };
        case 'requirements':
          return {
            id: "ID",
            title: "名称",
            describe: "描述",
            create_date: "创建时间"
          };
        case 'plans':
          return {
            id: "ID",
            title: "名称",
            creator: "制定者",
            create_date: "创建时间"
          };
        case 'envs':
          return {
            id: "ID",
            title: "名称",
            describe: "描述",
            create_date: "创建时间"
          };
        case 'flaws':
          return {
            id: "ID",
            title: "名称",
            productName: "产品名称",
            supplier: "供应商",
            productID: "产品ID",
            planID: "测试计划ID",
            // type:"状态",
            create_date: "创建时间"
          };
      }
    };

    self.getTabByName = function (name) {
      switch (name) {
        case 'products':
          return [{
            id: 0,
            name: "未备案"
          }, {
            id: 1,
            name: "已备案"
          }];
        case 'users':
          return [{
            id: 0,
            name: "超级管理员"
          }, {
            id: 1,
            name: "管理员"
          }, {
            id: 2,
            name: "测试员"
          }];
        case 'requirements':
          return [{
            id: 0,
            name: "单元测试"
          }, {
            id: 1,
            name: "集成测试"
          }, {
            id: 2,
            name: "功能测试"
          }, {
            id: 3,
            name: "性能测试"
          }];
        case 'plans':
          return [{
            id: 0,
            name: "未完成"
          }, {
            id: 1,
            name: "已完成"
          }];
        case 'envs':
          return [{
            id: 0,
            name: "软件环境"
          }, {
            id: 1,
            name: "硬件环境"
          }];
        case 'flaws':
          return [{
            id: 0,
            name: "提交"
          }, {
            id: 1,
            name: "确认"
          }, {
            id: 2,
            name: "修复"
          }, {
            id: 3,
            name: "重开"
          }, {
            id: 4,
            name: "关闭"
          }];
      }
    };

    self.getFormModelByName = function (name) {
      switch (name) {
        case 'products':
          return {
            name: "名称",
            model:"型号",
            batch: "批次",
            supplier: "供应商",
            describe: "描述"
          };
        case 'users':
          return {
            name: "名称",
            age:"年龄",
            skill:"技能",
            exp:"经验"
          };
        case 'requirements':
          return {
            title: "名称",
            describe: "描述"
          };
        case 'plans':
          return {
            title: "名称",
            describe: "描述"
          };
        case 'envs':
          return {
            name: "名称",
            age:"年龄",
            skill:"技能",
            exp:"经验"
          };
        case 'flaws':
          return {
            title: "名称"
          };
      }

    };
    self.getFrozenFormModelByName = function (name) {
      switch (name){
        case 'flaws':
          return {
            productID: "产品ID",
            planID: "测试计划ID"
          };
        default:
          return;
      }
    };
    self.getResourceName = function (name) {
      switch (name){
        case 'products':
          return "产品";
        case 'users':
          return "人员";
        case 'requirements':
          return "需求";
        case 'envs':
          return "环境";
        case 'plans':
          return "计划";
        case 'flaws':
          return "缺陷";
      }
    };

    /////////////////////
    // 页面All初始化构造函数bundle //
    /////////////////////
    self.pageInit = function(pageResourceName, pageType, vm) {
      pageMetaDateConstructor(pageResourceName, pageType, vm);
      paginationConstructor(vm);
      sortConstructor(vm);
      searchConstructor(vm);
      setTabConstructor(vm);
    };
    ///////////////
    // 页面元数据构造函数 //
    ///////////////
    var pageMetaDateConstructor = function(pageResourceName, pageType, vm) {
      return function() {
        vm.pageResourceName = pageResourceName;
        vm.pageType = pageType;
        vm.pageTitle = vm.pageResourceName + vm.pageType;
      }();
    };
    self.pageMetaDateConstructor = pageMetaDateConstructor;//暴露
    ////////////
    // 分页构造函数 //
    ////////////
    var paginationConstructor = function(vm) {
      return function() {
        // vm.totalItems = 100;
        vm.currentPage = 1;
        vm.itemsPerPage = 10;
        vm.maxSize = 5; //显示的时候页码的最多个数，忽略该参数

        // vm.setPage = function (pageNo) {
        //  vm.currentPage = pageNo;
        // };

        vm.pageChanged = function() {
          vm.get();
        };
      }();
    };
    ////////////
    // 排序构造函数 //
    ////////////
    var sortConstructor = function(vm) {
      return function() {
        vm.predicate = 'id';
        vm.reverse = true;
        vm.order = function(predicate) {
          vm.reverse = (vm.predicate === predicate) ? !vm.reverse : false;
          vm.predicate = predicate;
          vm.get();
        };
      }();
    };
    ////////////
    // 搜索构造函数 //
    ////////////
    var searchConstructor = function(vm) {
      return function() {
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
      }();
    };
    /**
     * 设置标签构造函数
     * @param vm
     */
    var setTabConstructor = function (vm) {
      return function () {
        vm.setTab = function (value) {
          if (typeof value === "undefined") {
            vm.type = -1;
          }else{
            vm.type = value;
          }
          vm.get();
        };
      }();
    }

  }]);
