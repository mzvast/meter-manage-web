'use strict';

describe('Controller: ActionTestCtrl', function () {

  // load the controller's module
  beforeEach(module('manageApp'));

  var ActionTestCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ActionTestCtrl = $controller('ActionTestCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ActionTestCtrl.awesomeThings.length).toBe(3);
  });
});
