'use strict';

describe('Directive: staffModule', function () {

  // load the directive's module
  beforeEach(module('amnohfelsClientApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<staff-module></staff-module>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the staffModule directive');
  }));
});
