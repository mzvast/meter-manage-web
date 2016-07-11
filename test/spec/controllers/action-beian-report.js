'use strict';

describe('Controller: ActionBeianReportCtrl', function () {

  // load the controller's module
  beforeEach(module('manageApp'));

  var ActionBeianReportCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ActionBeianReportCtrl = $controller('ActionBeianReportCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ActionBeianReportCtrl.awesomeThings.length).toBe(3);
  });
});
