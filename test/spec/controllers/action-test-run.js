'use strict';

describe('Controller: ActionTestRunCtrl', function () {

  // load the controller's module
  beforeEach(module('manageApp'));

  var ActionTestRunCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ActionTestRunCtrl = $controller('ActionTestRunCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ActionTestRunCtrl.awesomeThings.length).toBe(3);
  });
});
