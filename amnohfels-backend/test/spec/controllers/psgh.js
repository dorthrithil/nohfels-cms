'use strict';

describe('Controller: PsghCtrl', function () {

  // load the controller's module
  beforeEach(module('amnohfelsBackendApp'));

  var PsghCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PsghCtrl = $controller('PsghCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
