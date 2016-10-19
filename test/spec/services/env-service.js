'use strict';

describe('Service: envService', function () {

  // load the service's module
  beforeEach(module('manageApp'));

  // instantiate service
  var envService;
  beforeEach(inject(function (_envService_) {
    envService = _envService_;
  }));

  it('should do something', function () {
    expect(!!envService).toBe(true);
  });

});
