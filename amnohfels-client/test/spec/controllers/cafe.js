'use strict';

describe('Controller: CafeCtrl', function () {

  // load the controller's module
  beforeEach(module('amnohfelsClientApp'));

  var CafeCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CafeCtrl = $controller('CafeCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
