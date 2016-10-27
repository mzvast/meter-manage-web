'use strict';

describe('Service: compareTestingService', function () {

  // load the service's module
  beforeEach(module('manageApp'));

  // instantiate service
  var compareTestingService;
  beforeEach(inject(function (_compareTestingService_) {
    compareTestingService = _compareTestingService_;
  }));

  it('should do something', function () {
    expect(!!compareTestingService).toBe(true);
  });

});
