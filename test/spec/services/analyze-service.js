'use strict';

describe('Service: analyzeService', function () {

  // load the service's module
  beforeEach(module('manageApp'));

  // instantiate service
  var analyzeService;
  beforeEach(inject(function (_analyzeService_) {
    analyzeService = _analyzeService_;
  }));

  it('should do something', function () {
    expect(!!analyzeService).toBe(true);
  });

});
