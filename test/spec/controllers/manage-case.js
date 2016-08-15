'use strict';

describe('Controller: ManageCaseCtrl', function () {

  // load the controller's module
  beforeEach(module('manageApp'));

  var ManageCaseCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ManageCaseCtrl = $controller('ManageCaseCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ManageCaseCtrl.awesomeThings.length).toBe(3);
  });
});
