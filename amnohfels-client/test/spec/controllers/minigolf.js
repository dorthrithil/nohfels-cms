'use strict';

describe('Controller: MinigolfCtrl', function () {

  // load the controller's module
  beforeEach(module('amnohfelsClientApp'));

  var MinigolfCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MinigolfCtrl = $controller('MinigolfCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
