'use strict';

describe('Controller: ActionBeianHexCtrl', function () {

  // load the controller's module
  beforeEach(module('manageApp'));

  var ActionBeianHexCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ActionBeianHexCtrl = $controller('ActionBeianHexCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ActionBeianHexCtrl.awesomeThings.length).toBe(3);
  });
});
