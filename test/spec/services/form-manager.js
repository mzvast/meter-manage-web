'use strict';

describe('Service: formManager', function () {

  // load the service's module
  beforeEach(module('manageApp'));

  // instantiate service
  var formManager;
  beforeEach(inject(function (_formManager_) {
    formManager = _formManager_;
  }));

  it('should do something', function () {
    expect(!!formManager).toBe(true);
  });

});
