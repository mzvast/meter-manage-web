'use strict';

describe('Service: requirementService', function () {

  // load the service's module
  beforeEach(module('manageApp'));

  // instantiate service
  var requirementService;
  beforeEach(inject(function (_requirementService_) {
    requirementService = _requirementService_;
  }));

  it('should do something', function () {
    expect(!!requirementService).toBe(true);
  });

});
