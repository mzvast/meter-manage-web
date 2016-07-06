'use strict';

describe('Controller: ActionBeianCtrl', function () {

  // load the controller's module
  beforeEach(module('manageApp'));

  var ActionBeianCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ActionBeianCtrl = $controller('ActionBeianCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ActionBeianCtrl.awesomeThings.length).toBe(3);
  });
});
