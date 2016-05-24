'use strict';

describe('Controller: NotificationCtrl', function () {

  // load the controller's module
  beforeEach(module('manageApp'));

  var NotificationCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NotificationCtrl = $controller('NotificationCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(NotificationCtrl.awesomeThings.length).toBe(3);
  });
});
