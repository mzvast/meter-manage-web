'use strict';

describe('Controller: ActionTestEncryptCtrl', function () {

  // load the controller's module
  beforeEach(module('manageApp'));

  var ActionTestEncryptCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ActionTestEncryptCtrl = $controller('ActionTestEncryptCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ActionTestEncryptCtrl.awesomeThings.length).toBe(3);
  });
});
