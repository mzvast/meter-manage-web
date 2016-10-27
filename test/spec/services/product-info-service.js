'use strict';

describe('Service: productInfoService', function () {

  // load the service's module
  beforeEach(module('manageApp'));

  // instantiate service
  var productInfoService;
  beforeEach(inject(function (_productInfoService_) {
    productInfoService = _productInfoService_;
  }));

  it('should do something', function () {
    expect(!!productInfoService).toBe(true);
  });

});
