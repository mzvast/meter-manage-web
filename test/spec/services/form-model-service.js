'use strict';

describe('Service: formModelService', function () {

  // load the service's module
  beforeEach(module('manageApp'));

  // instantiate service
  var formModelService;
  beforeEach(inject(function (_formModelService_) {
    formModelService = _formModelService_;
  }));

  it('should do something', function () {
    expect(!!formModelService).toBe(true);
  });

});
