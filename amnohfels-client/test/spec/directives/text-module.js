'use strict';

describe('Directive: textModule', function () {

  // load the directive's module
  beforeEach(module('amnohfelsClientApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<text-module></text-module>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the textModule directive');
  }));
});
