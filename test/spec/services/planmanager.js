'use strict';

describe('Service: planManager', function () {

  // load the service's module
  beforeEach(module('manageApp'));

  // instantiate service
  var planManager;
  beforeEach(inject(function (_planManager_) {
    planManager = _planManager_;
  }));

  it('should do something', function () {
    expect(!!planManager).toBe(true);
  });

});
