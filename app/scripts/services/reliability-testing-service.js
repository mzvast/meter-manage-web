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

reliabilityTestingService.$inject = ['resultService'];
function reliabilityTestingService(resultService) {
  var self = this;
  self.setPlan = function (plan) {
    self.plan = plan;
    self.result=plan.casesList.map(function (item) {
      return {caseId:item.id,pass:-1}
    });
  };
  self.getTitle = function () {
    return self.plan.title;
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
  };
  self.getResult = function () {
    return self.result;
  };
  self.finish = function (cb) {
    resultService.add(self.result,self.plan.id,cb)
  };

  self.addResult = function (form) {
    console.log(form.caseId);
    self.result = self.result.map(function (item) {
    console.log(item.caseId===form.caseId);
      return item.caseId===form.caseId?form:item;
    });
    console.log(self.result);
  }
}
