'use strict';

describe('Service: wsManager', function () {

  // load the service's module
  beforeEach(module('manageApp'));

  // instantiate service
  var wsManager;
  beforeEach(inject(function (_wsManager_) {
    wsManager = _wsManager_;
  }));

  it('should do something', function () {
    expect(!!wsManager).toBe(true);
  });

});
