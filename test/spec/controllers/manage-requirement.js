'use strict';

describe('Controller: ManageRequirementCtrl', function () {

  // load the controller's module
  beforeEach(module('manageApp'));

  var ManageRequirementCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ManageRequirementCtrl = $controller('ManageRequirementCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ManageRequirementCtrl.awesomeThings.length).toBe(3);
  });
});
