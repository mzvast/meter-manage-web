'use strict';

/**
 * @ngdoc service
 * @name manageApp.formManager
 * @description
 * # formManager
 * Service in the manageApp.
 */
angular.module('manageApp')
  .service('formManager', ['$http','dataManager',function ($http,dataManager) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var self = this;
    /**
     * 获取form的json文件
     * @param formName
     * @returns {HttpPromise}
     */
    self.getForm = function (name,vm) {
      var url = '/form/' + name + '.json';
      $http.get(url).success(function (data) {
        vm.title = data.title;
        vm.fields = data.fields;
      })
    }

  }]);
