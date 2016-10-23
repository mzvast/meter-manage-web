'use strict';

/**
 * @ngdoc service
 * @name manageApp.reliabilityTestingService
 * @description
 * # reliabilityTestingService
 * Service in the manageApp.
 */
angular.module('manageApp')
  .service('reliabilityTestingService', reliabilityTestingService);

reliabilityTestingService.$inject = [];
function reliabilityTestingService() {
  var self = this;
  self.setPlan = function (plan) {
    self.plan = plan;
  };
  self.getPlan = function () {
    return self.plan;
  };
  self.getProduct = function () {
    return self.plan.productsList[0];
  };
  self.getEnvs = function () {
    return self.plan.envsList;
  };
  self.getCases = function () {
    return self.plan.casesList;
  }
}
