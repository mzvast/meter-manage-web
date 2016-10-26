'use strict';

describe('Service: resourceCenter', function () {

  // load the service's module
  beforeEach(module('manageApp'));

  // instantiate service
  var resourceCenter;
  beforeEach(inject(function (_resourceCenter_) {
    resourceCenter = _resourceCenter_;
  }));

  it('should do something', function () {
    expect(!!resourceCenter).toBe(true);
  });

});
