'use strict';

describe('Controller: ManageFlawCtrl', function () {

  // load the controller's module
  beforeEach(module('manageApp'));

  var ManageFlawCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ManageFlawCtrl = $controller('ManageFlawCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ManageFlawCtrl.awesomeThings.length).toBe(3);
  });
});
