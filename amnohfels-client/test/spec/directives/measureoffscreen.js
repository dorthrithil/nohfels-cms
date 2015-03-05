'use strict';

describe('Directive: measureOffscreen', function () {

  // load the directive's module
  beforeEach(module('amnohfelsClientApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<measure-offscreen></measure-offscreen>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the measureOffscreen directive');
  }));
});
