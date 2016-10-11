'use strict';

describe('Service: authGuard', function () {

  // load the service's module
  beforeEach(module('manageApp'));

  // instantiate service
  var authGuard;
  beforeEach(inject(function (_authGuard_) {
    authGuard = _authGuard_;
  }));

  it('should do something', function () {
    expect(!!authGuard).toBe(true);
  });

});
