'use strict';

describe('Controller: InitloadingspinnerCtrl', function () {

  // load the controller's module
  beforeEach(module('amnohfelsClientApp'));

  var InitloadingspinnerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    InitloadingspinnerCtrl = $controller('InitloadingspinnerCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
