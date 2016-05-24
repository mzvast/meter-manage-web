'use strict';

describe('Controller: ManageProductCtrl', function () {

  // load the controller's module
  beforeEach(module('manageApp'));

  var ManageProductCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ManageProductCtrl = $controller('ManageProductCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ManageProductCtrl.awesomeThings.length).toBe(3);
  });
});
