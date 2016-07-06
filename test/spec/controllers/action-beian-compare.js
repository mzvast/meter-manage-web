'use strict';

describe('Controller: ActionBeianCompareCtrl', function () {

  // load the controller's module
  beforeEach(module('manageApp'));

  var ActionBeianCompareCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ActionBeianCompareCtrl = $controller('ActionBeianCompareCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ActionBeianCompareCtrl.awesomeThings.length).toBe(3);
  });
});
