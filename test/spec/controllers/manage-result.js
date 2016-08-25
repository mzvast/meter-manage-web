'use strict';

describe('Controller: ManageResultCtrl', function () {

  // load the controller's module
  beforeEach(module('manageApp'));

  var ManageResultCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ManageResultCtrl = $controller('ManageResultCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ManageResultCtrl.awesomeThings.length).toBe(3);
  });
});
