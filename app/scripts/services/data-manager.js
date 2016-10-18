'use strict';

/**
 * @ngdoc service
 * @name manageApp.dataManager
 * @description
 * # dataManager
 * Service in the manageApp.
 */
angular.module('manageApp')
  .service('dataManager', dataManager);

dataManager.$inject = ['$http', '$resource', 'notificationService'];

function dataManager($http, $resource,notificationService) {
  // AngularJS will instantiate a singleton by calling "new" on this function
  var self = this;

  self.pdfMake = function (docDef) {
    return $http.post("/node/pdf", docDef, {responseType: 'arraybuffer'});
  };

  //////////////////
  //notifications TODO removing//
  //////////////////
  self.notifications = [];
  self.addNotification = notificationService.addNotification;
  self.getNotifications = notificationService.getNotifications;
  self.removeNotification = notificationService.removeNotification;

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
    'vendors',
    'cases',
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
  // self.getRemoteInfo = function (id,cb) {
  //   self['infos'].get({
  //     id:id
  //   }).$promise
  //     .then(function (response) {
  //       console.log("获取" + 'info' + " SUCCESS!");
  //
  //       // console.dir(response);
  //       // console.dir(response.json);
  //       cb(response)
  //     });
  // };
  self.getRemoteInfo = function (id, cb) {
    var httpPath = '/api/v2/products/' + id + "/details";//'/node/file';
    $http.get(httpPath)
      .success(function (response, status, headers) {
        if (typeof cb === 'function') {
          console.log("获取" + 'info' + " SUCCESS!");
          cb(response);
        }
      })
  };
  /**
   * 设置产品详细信息
   * @param id
   * @param data
   * @param cb
   */
  self.setRemoteInfo = function (id, data, cb) {
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

  self.setRemoteHex = function (id, fileArray, cb) {
    var uploadUrl = '/api/v2/products/' + id + "/hexfiles";
    var fd = new FormData();
    var i;
    for (i = 0; i < fileArray.length; i++) {
      fd.append(i + 1, fileArray[i]);
    }
    $http.post(uploadUrl, fd, {
      transformRequest: angular.identity,
      headers: {'Content-Type': undefined}
    })
      .success(function (response, status, headers) {
        if (typeof cb === 'function') {
          cb(response);
        }
      })
      .error(function () {
      });
  };

  self.getRemoteHexNum = function (id, cb) {
    var httpPath = '/api/v2/products/' + id + "/hexfiles";//'/node/file';
    $http.get(httpPath)
      .success(function (response, status, headers) {
        if (typeof cb === 'function') {
          cb(response);
        }
      })
  };

  self.getResultListByQuery = function (queryObj, cb) {
    var httpPath = '/api/v2/plans/results';
    var config = {
      params: queryObj
    };
    $http.get(httpPath, config)
      .success(function (response, status, headers) {
        console.log(response);
        if (typeof cb === 'function') {
          cb(response);
        }
      })
  };

  self.getRemoteHex = function (id, index, cb) {
    var httpPath = '/api/v2/hex/' + id + '/' + index;//'/node/file';
    var blob;
    $http.get(httpPath, {
      responseType: 'arraybuffer'
    }).success(function (data, status, headers) {
      headers = headers();

      var filename = headers['x-filename'];
      var contentType = headers['content-type'];

      try {
        blob = new Blob([data], {type: contentType});

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

  self.setRemoteResult = function (id, results, cb) {
    var httpPath = '/api/v2/plans/' + id + "/results";//'/node/file';
    $http.post(httpPath, results)
      .success(function (response, status, headers) {
        if (typeof cb === 'function') {
          cb(response);
        }
      })
  };

  self.getPlanResultbyId = function (id, cb) {
    var httpPath = '/api/v2/plans/' + id + "/results";//'/node/file';
    $http.get(httpPath)
      .success(function (response, status, headers) {
        if (typeof cb === 'function') {
          cb(response);
        }
      })
  };

  //////////////
  // CRUD构造函数 //
  //////////////
  self.ReadListByQuery = function (resourceName, queryObj, cb) {
    // console.log(queryObj);
    self[resourceName].get(queryObj).$promise
      .then(function (response) {
        // console.log("获取" + vm.pageResourceName + " SUCCESS!");
        if (typeof cb === 'function') {
          cb(response);
        }
      });
  };

  self.ReadOneById = function (resourceName, thisID, cb) {
    // console.log(queryObj);
    self[resourceName].get({id: thisID}).$promise
      .then(function (response) {
        // console.log("获取" + vm.pageResourceName + " SUCCESS!");
        if (typeof cb === 'function') {
          cb(response);
        }
      });
  };

  self.CreateOne = function (resourceName, formObj, cb) {
    console.log("formObj=");
    console.log(formObj);
    self[resourceName].save(formObj).$promise
      .then(function (response) {
        console.log("新增资源 SUCCESS!");
        // console.log(data);
        // self.addNotification("success", "新" + vm.pageResourceName + "创建成功");
        // vm.get();
        if (typeof cb === 'function') {
          cb(response);
        }
      });
  };
  self.UpdateOneByID = function (resourceName, formObj, id, cb) {
    console.log("formObj=");
    console.log(formObj);
    self[resourceName].update({
      id: id
    }, formObj).$promise
      .then(function (response) {
        console.log("修改资源 SUCCESS!");
        // console.log(data);
        if (typeof cb === 'function') {
          cb(response);
        }
      });
  };
  self.DeleteOneByID = function (resourceName, id, cb) {
    console.log("id=" + id);
    self[resourceName].delete({
      id: id
    }).$promise
      .then(function (response) {
        console.log("删除资源 SUCCESS!");
        // console.log(data);
        if (typeof cb === 'function') {
          cb(response);
        }
        // vm.get();
      });
  };

  self.getModelByName = function (name) {
    switch (name) {
      case 'products':
      {
        return {
          id: "ID",
          name: "名称",
          model: "型号",
          batch: "批次",
          description: "描述",
          vendor: "厂家名称",
          vendor_code: "厂家代码",
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
      case 'vendors':
        return {
          id: "ID",
          name: "厂家名称",
          code: "厂家代码"
        };
      case 'results':
        return {
          id: "ID",
          plan_name: "计划名称",
          product_name: "产品名称",
          vendor_name: "厂家",
          create_date: "测试时间"
          // result_name:"结果"
        };
      case 'cases':
        return {
          id: "ID",
          title: "名称",
          describe: "描述"//,
          // env:"适用环境",
          // req:"适用需求"
          // create_date: "创建时间"
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
          vendor: "供应商",
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
      case 'vendors':
        return [];
      case 'results':
        return [{
          id: 0,
          name: "失败"
        }, {
          id: 1,
          name: "成功"
        }];
      case 'cases':
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
          model: "型号",
          batch: "批次",
          description: "描述"
        };
      case 'users':
        return {
          name: "名称",
          age: "年龄",
          skill: "技能",
          exp: "经验"
        };
      case 'requirements':
        return {
          title: "名称",
          describe: "描述"
        };
      case 'vendors':
        return {
          vendor: "厂家名称",
          vendor_code: "厂家代码"
        };
      case 'cases':
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
          title: "名称",
          describe: "描述"
        };
      case 'flaws':
        return {
          title: "名称"
        };
    }

  };
  self.getFrozenFormModelByName = function (name) {
    switch (name) {
      case 'flaws':
        return {
          productID: "产品ID",
          planID: "测试计划ID"
        };
      default:
        return;
    }
  };


  self.getSpecialFormModelByName = function (name) {
    switch (name) {
      case 'cases':
        return {
          env: "所属环境",
          req: "所属需求"
        }
    }
  };
  self.getResourceName = function (name) {
    switch (name) {
      case 'products':
        return "产品";
      case 'users':
        return "人员";
      case 'requirements':
        return "需求";
      case 'vendors':
        return "厂家"
      case 'cases':
        return "用例";
      case 'envs':
        return "环境";
      case 'plans':
        return "计划";
      case 'flaws':
        return "缺陷";
      case 'results':
        return "结果";
    }
  };

  self.uploadCompareResults = function (id, compareresult, comparetype, cb) {
    var httpPath = '/api/v2/products/' + id + "/compareresults";//'/node/file';
    $http.post(httpPath, {
      compare_result: compareresult,
      compare_type: comparetype
    })
      .success(function (response, status, headers) {
        if (typeof cb === 'function') {
          cb(response);
        }
      })
  };



}
