'use strict';

describe('Service: reliabilityTestingService', function () {

  // load the service's module
  beforeEach(module('manageApp'));

  // instantiate service
  var reliabilityTestingService;
  beforeEach(inject(function (_reliabilityTestingService_) {
    reliabilityTestingService = _reliabilityTestingService_;
  }));

  it('should do something', function () {
    expect(!!reliabilityTestingService).toBe(true);
  });

});
