'use strict';

describe('Controller: ReisemobilstellplatzCtrl', function () {

  // load the controller's module
  beforeEach(module('amnohfelsBackendApp'));

  var ReisemobilstellplatzCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ReisemobilstellplatzCtrl = $controller('ReisemobilstellplatzCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
