'use strict';

describe('Service: resultService', function () {

  // load the service's module
  beforeEach(module('manageApp'));

  // instantiate service
  var resultService;
  beforeEach(inject(function (_resultService_) {
    resultService = _resultService_;
  }));

  it('should do something', function () {
    expect(!!resultService).toBe(true);
  });

});
