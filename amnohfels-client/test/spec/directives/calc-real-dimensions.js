'use strict';

describe('Directive: calcRealDimensions', function () {

  // load the directive's module
  beforeEach(module('amnohfelsClientApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<calc-real-dimensions></calc-real-dimensions>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the calcRealDimensions directive');
  }));
});
