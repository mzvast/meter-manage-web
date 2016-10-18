'use strict';

/**
 * @ngdoc service
 * @name manageApp.productService
 * @description
 * # productService
 * Service in the manageApp.
 */
angular.module('manageApp')
  .service('productService', ['$resource',function ($resource) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var self = this;
      var url = '/api/v2/' + 'products' + '/:id';
      var resource = $resource(url, {
        id: '@id'
      }, {
        update: {
          method: 'PUT'
        }
      });
    self.getList = function (queryObj, cb) {
      console.log(queryObj);
      resource.get(queryObj).$promise
        .then(function (response) {
          // console.log("获取" + vm.pageResourceName + " SUCCESS!");
          if (typeof cb === 'function') {
            cb(response);
          }
        });
    };
    self.fetchList = function (queryObj) {
      return fetch(`/api/v2/products?current_page=${queryObj.current_page}&items_per_page=${queryObj.items_per_page}&order_by=${queryObj.order_by}&reverse=${queryObj.reverse}`,
        {
          method: 'GET',
          mode: 'cors',
          cache: 'default'
        }
      )
        .then(function (response) {
          console.log(response);
          if(response.ok) {
            return response.json()
          }
        })
    }
  }]);
