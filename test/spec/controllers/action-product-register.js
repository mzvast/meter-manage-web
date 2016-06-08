'use strict';

describe('Controller: ActionProductRegisterCtrl', function () {

  // load the controller's module
  beforeEach(module('manageApp'));

  var ActionProductRegisterCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ActionProductRegisterCtrl = $controller('ActionProductRegisterCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ActionProductRegisterCtrl.awesomeThings.length).toBe(3);
  });
});
