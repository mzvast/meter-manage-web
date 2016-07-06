'use strict';

describe('Controller: ActionBeianInfoCtrl', function () {

  // load the controller's module
  beforeEach(module('manageApp'));

  var ActionBeianInfoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ActionBeianInfoCtrl = $controller('ActionBeianInfoCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ActionBeianInfoCtrl.awesomeThings.length).toBe(3);
  });
});
