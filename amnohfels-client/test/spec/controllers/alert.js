'use strict';

describe('Controller: AlertCtrl', function () {

  // load the controller's module
  beforeEach(module('amnohfelsClientApp'));

  var AlertCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AlertCtrl = $controller('AlertCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
