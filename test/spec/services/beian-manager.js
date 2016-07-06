'use strict';

describe('Service: beianManager', function () {

  // load the service's module
  beforeEach(module('manageApp'));

  // instantiate service
  var beianManager;
  beforeEach(inject(function (_beianManager_) {
    beianManager = _beianManager_;
  }));

  it('should do something', function () {
    expect(!!beianManager).toBe(true);
  });

});
