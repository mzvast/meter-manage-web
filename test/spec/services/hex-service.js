'use strict';

describe('Service: hexService', function () {

  // load the service's module
  beforeEach(module('manageApp'));

  // instantiate service
  var hexService;
  beforeEach(inject(function (_hexService_) {
    hexService = _hexService_;
  }));

  it('should do something', function () {
    expect(!!hexService).toBe(true);
  });

});
