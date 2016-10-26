'use strict';

/**
 * @ngdoc service
 * @name manageApp.resourceCenter
 * @description
 * # resourceCenter
 * Service in the manageApp.
 */
angular.module('manageApp')
  .service('resourceCenter', resourceCenter);

resourceCenter.$inject = ['$resource','authService'];

function resourceCenter($resource,authService) {
  var self = this;
  function methodWithToken() {
    return {
      get:{
        method: 'GET',
        headers:{
          token:authService.token
        }
      },
      update: {
        method: 'PUT',
        headers:{
          token:authService.token
        }
      },
      remove: {
        method: 'DELETE',
        headers:{
          token:authService.token
        }
      }
    }
  }

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
    }, methodWithToken());
  });

  self['results'] = (function () {
    var url = '/api/v2/plans/:id/results';
    return $resource(url, {
      id: '@id'
    }, methodWithToken());
  }());

  self['analyze'] = (function () {
    var url = '/api/v2/' + 'analyze' + '/:category' + '/:id';
    return $resource(url, {
      id: '@id',
      category: '@category'
    }, methodWithToken());
  }());

  self.get = function (name) {
    return self[name];
  }
}
