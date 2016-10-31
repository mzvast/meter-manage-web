'use strict';

/**
 * @ngdoc service
 * @name manageApp.compareTestingService
 * @description
 * # compareTestingService
 * Service in the manageApp.
 */
angular.module('manageApp')
  .service('compareTestingService', compareTestingService);

compareTestingService.$inject = ['$rootScope','resourceCenter'];

function compareTestingService($rootScope,resourceCenter) {
  var self = this;
  //默认值
  var defaultArgs = [
    {
      "bit": 1,
      "on": false,
      "num": "xxxxxxxxxxxx",
      "addr": "xxxxxxxxxxxx",
      "type": "single_phase",
      "vol": 220,
      "key_index": "04"
    },
    {
      "bit": 2,
      "on": false,
      "num": "xxxxxxxxxxxx",
      "addr": "xxxxxxxxxxxx",
      "type": "single_phase",
      "vol": 220,
      "key_index": "04"
    },
    {
      "bit": 3,
      "on": false,
      "num": "xxxxxxxxxxxx",
      "addr": "xxxxxxxxxxxx",
      "type": "single_phase",
      "vol": 220,
      "key_index": "04"
    },
    {
      "bit": 4,
      "on": false,
      "num": "xxxxxxxxxxxx",
      "addr": "xxxxxxxxxxxx",
      "type": "single_phase",
      "vol": 220,
      "key_index": "04"
    },
    {
      "bit": 5,
      "on": false,
      "num": "xxxxxxxxxxxx",
      "addr": "xxxxxxxxxxxx",
      "type": "three_phase",
      "vol": 220,
      "key_index": "04"
    },
    {
      "bit": 6,
      "on": false,
      "num": "xxxxxxxxxxxx",
      "addr": "xxxxxxxxxxxx",
      "type": "three_phase",
      "vol": 220,
      "key_index": "04"
    },
    {
      "bit": 7,
      "on": false,
      "num": "xxxxxxxxxxxx",
      "addr": "xxxxxxxxxxxx",
      "type": "three_phase",
      "vol": 220,
      "key_index": "04"
    },
    {
      "bit": 8,
      "on": false,
      "num": "xxxxxxxxxxxx",
      "addr": "xxxxxxxxxxxx",
      "type": "three_phase",
      "vol": 220,
      "key_index": "04"
    }
  ];
  var formModel = [
    'costcontrol_type',
    'i_spec',
    'program_for_meter',
    'program_type',
    'program_version',
    'report_num',
    'v_spec'
  ];
  //Product部分
  var mcu_info = [];
  var product,recordNum,compareNum;
  var form = {};
  var core_num = 0;
  //Args部分
  var args = defaultArgs;
  //HEX部分
  var hexObj = [];//id,md5,filename

  /**
   * 备案号和比对报告编号号
   */
  self.setRecordNum = function (val) {
    recordNum = val;
  };
  self.getRecordNum = function () {
    return recordNum;
  };
  self.setCompareNum = function (val) {
    compareNum = val;
  };
  self.getCompareNum = function () {
    return compareNum;
  };

  /**
   * 比对结果
   */

  var resource = resourceCenter.get('compareresults');
  self.postResult = function (formObj, id,cb) {
    console.log("formObj=");
    console.log(formObj);
    resource.save({id:id},formObj).$promise
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




  /**
   * Product
   */

  self.setProduct = function (productObj) {
    product = productObj;
  };

  self.getTitle = function () {
    return product?product.name:'Test_product';
  };

  self.getProduct = function () {
    return product;
  };
  /**
   * Form
   */
  self.setForm = function (formObj) {
    form = formObj;
    console.log('service中的form(product)',form);
  };

  self.getForm = function () {
    return form;
  };

  self.getProductDetail = self.getForm;

  self.initForm = function (responseData) {
    formModel.map(function (item) {
      form[item] = responseData[item]||'未定义';
    });
  };

  /**
   * MCU info
   */

  self.addMcuInfo = function (info) {
    mcu_info.push(info);
  };

  self.removeMcuInfo = function (index) {
    mcu_info.splice(index, 1);
  };

  self.setMcuInfo = function (mcu_id,info) {
    // console.log('setting mcu info',info);
    mcu_info=mcu_info.map(function (item) {
      if(item.mcu_id === info.mcu_id) return info;
      return item;
    });
    console.log('service中的mcu_info',mcu_info);
  };

  self.initMcuInfo = function (responseData) {
    self.clearMcuInfo();
    responseData.mcu_info.map(function (item) {
      self.addMcuInfo(item);
    })
  };

  self.getMcuInfo = function (mcu_id) {
    for(var i=0;i<core_num;i++){
      if(mcu_info[i]['mcu_id'] === mcu_id) return mcu_info[i];
    }
    return null;
  };

  self.getAllMcuInfo = function () {
    return mcu_info;
  };

  self.clearMcuInfo = function () {
    mcu_info = [];
    core_num = 0;
  };

  /**
   * core numbers
   */

  self.getCoreNum = function () {
    return core_num;
  };

  self.addCore = function () {
    core_num++;
    self.addHex(core_num);
    self.addMcuInfo({mcu_id:core_num});
    $rootScope.$emit('hexObj-updated');
  };

  self.removeCore = function () {
    if(core_num<=0) return;
    core_num--;
    self.removeMcuInfo(core_num);
    self.removeHex(core_num);
    $rootScope.$emit('hexObj-updated');
  };

  /**
   * Args 相关
   */
  self.setArgs = function (new_args) {
    args = new_args;
    console.log('service中的args',self.getCleanArgs());
  };
  self.getArgs = function () {
    return args;
  };
  self.getCleanArgs = function () {
    return angular.copy(args).reduce(function (pre, cur, index, array) {
      if(cur.on){
        delete cur.on;
        pre.push(cur);
      }
      return pre;
    },[])
  };





  /**
   * 数据初始化
   */

  self.initData = function (responseData) {

    if(responseData.mcu_info){
      self.initMcuInfo(responseData);
    }
    responseData?self.initForm(responseData):undefined;

    self.initHex();//TODO 带数据初始化
  };

  /**
   * HEX
   */
  self.initHex = function () {
    hexObj = [];
    for(var i=0;i<core_num;i++){
      self.addHex(i);
    }
    console.log('init hexObj',hexObj);
  };

  self.addHex = function (index) {
    hexObj.push({
      id:index,
      filename:'未选择',
      md5:'未选择',
      hex:undefined
    })
  };

  self.removeHex = function (index) {
    hexObj.splice(index,1)
  };

  self.subscribe = function (scope, callback) {
    var hander = $rootScope.$on('hexObj-updated',callback);
    scope.$on('$destroy',hander);
  };
  //多个hex文件设置
  self.setHexObj = function (obj) {
    obj.forEach(function (hexItem) {
      self.setHex(
        hexItem.id,
        hexItem.filename,
        hexItem.md5,
        hexItem.hex
      )
    });
    console.log('service中的hexObj',hexObj)
  };
  //单个hex文件
  self.setHex = function (id,filename,md5,hex) {
    hexObj = hexObj.map(function (item) {
      if(item.id===id) {
        return {
          id:id,
          filename:filename,
          md5:md5,
          hex:hex
          }
        }
        return item;

    })
  };

  self.getAllHex = function () {
    return hexObj;
  };

  /**
   *  比对信息make函数
   */

  self.getCompareInfo = function () {
    var obj = {};
    obj['mcu_info'] = angular.copy(mcu_info).map(function (item) {
      delete item.mcu_model;
      return item;
    });
    obj['meter_info'] = self.getCleanArgs();
    obj['file_info'] = hexObj.map(function (item) {
      return {
        mcu_id:item.id,
        extname:item.filename.match(/\w+$/)[0],
        md5:item.md5
      }
    });
    obj['costcontrol_type'] = form.costcontrol_type;

    return obj;
  };

}

