'use strict';

describe('Controller: ActionBeianArgCtrl', function () {

  // load the controller's module
  beforeEach(module('manageApp'));

  var ActionBeianArgCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ActionBeianArgCtrl = $controller('ActionBeianArgCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ActionBeianArgCtrl.awesomeThings.length).toBe(3);
  });
});
