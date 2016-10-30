'use strict';

describe('Service: wsService', function () {

  // load the service's module
  beforeEach(module('manageApp'));

  // instantiate service
  var wsService;
  beforeEach(inject(function (_wsService_) {
    wsService = _wsService_;
  }));

  it('should do something', function () {
    expect(!!wsService).toBe(true);
  });

});
