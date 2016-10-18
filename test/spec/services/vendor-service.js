'use strict';

describe('Service: vendorService', function () {

  // load the service's module
  beforeEach(module('manageApp'));

  // instantiate service
  var vendorService;
  beforeEach(inject(function (_vendorService_) {
    vendorService = _vendorService_;
  }));

  it('should do something', function () {
    expect(!!vendorService).toBe(true);
  });

});
