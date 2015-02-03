'use strict';

describe('Controller: NotfoundCtrl', function () {

  // load the controller's module
  beforeEach(module('amnohfelsClientApp'));

  var NotfoundCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NotfoundCtrl = $controller('NotfoundCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
