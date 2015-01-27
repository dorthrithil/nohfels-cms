'use strict';

describe('Controller: NachtigallentalCtrl', function () {

  // load the controller's module
  beforeEach(module('amnohfelsClientApp'));

  var NachtigallentalCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NachtigallentalCtrl = $controller('NachtigallentalCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
