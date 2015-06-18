'use strict';

describe('Controller: DynamiclinkerCtrl', function () {

  // load the controller's module
  beforeEach(module('amnohfelsClientApp'));

  var DynamiclinkerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DynamiclinkerCtrl = $controller('DynamiclinkerCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
