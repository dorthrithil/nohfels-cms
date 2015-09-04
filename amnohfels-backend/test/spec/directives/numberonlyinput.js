'use strict';

describe('Directive: numberOnlyInput', function () {

  // load the directive's module
  beforeEach(module('amnohfelsBackendApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<number-only-input></number-only-input>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the numberOnlyInput directive');
  }));
});
