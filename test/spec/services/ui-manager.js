'use strict';

describe('Service: uiManager', function () {

  // load the service's module
  beforeEach(module('manageApp'));

  // instantiate service
  var uiManager;
  beforeEach(inject(function (_uiManager_) {
    uiManager = _uiManager_;
  }));

  it('should do something', function () {
    expect(!!uiManager).toBe(true);
  });

});
