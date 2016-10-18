'use strict';

describe('Service: modelService', function () {

  // load the service's module
  beforeEach(module('manageApp'));

  // instantiate service
  var modelService;
  beforeEach(inject(function (_modelService_) {
    modelService = _modelService_;
  }));

  it('should do something', function () {
    expect(!!modelService).toBe(true);
  });

});
