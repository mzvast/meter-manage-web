'use strict';

describe('Controller: FormCtrl', function () {

  // load the controller's module
  beforeEach(module('manageApp'));

  var FormCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FormCtrl = $controller('FormCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(FormCtrl.awesomeThings.length).toBe(3);
  });
});
