'use strict';

describe('Controller: ActionTestCompareCtrl', function () {

  // load the controller's module
  beforeEach(module('manageApp'));

  var ActionTestCompareCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ActionTestCompareCtrl = $controller('ActionTestCompareCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ActionTestCompareCtrl.awesomeThings.length).toBe(3);
  });
});
