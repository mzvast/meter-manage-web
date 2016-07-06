'use strict';

describe('Controller: ActionBeianSelectProductCtrl', function () {

  // load the controller's module
  beforeEach(module('manageApp'));

  var ActionBeianSelectProductCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ActionBeianSelectProductCtrl = $controller('ActionBeianSelectProductCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ActionBeianSelectProductCtrl.awesomeThings.length).toBe(3);
  });
});
