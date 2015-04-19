'use strict';

describe('Controller: Status404Ctrl', function () {

  // load the controller's module
  beforeEach(module('amnohfelsClientApp'));

  var Status404Ctrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    Status404Ctrl = $controller('Status404Ctrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
