'use strict';

describe('Controller: ImprintCtrl', function () {

  // load the controller's module
  beforeEach(module('amnohfelsClientApp'));

  var ImprintCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ImprintCtrl = $controller('ImprintCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
