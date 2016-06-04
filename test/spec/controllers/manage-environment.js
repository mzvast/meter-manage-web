'use strict';

describe('Controller: ManageEnvironmentCtrl', function () {

  // load the controller's module
  beforeEach(module('manageApp'));

  var ManageEnvironmentCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ManageEnvironmentCtrl = $controller('ManageEnvironmentCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ManageEnvironmentCtrl.awesomeThings.length).toBe(3);
  });
});
