'use strict';

describe('Controller: ActionBeianProductCtrl', function () {

  // load the controller's module
  beforeEach(module('manageApp'));

  var ActionBeianProductCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ActionBeianProductCtrl = $controller('ActionBeianProductCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ActionBeianProductCtrl.awesomeThings.length).toBe(3);
  });
});
