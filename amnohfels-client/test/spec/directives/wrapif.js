'use strict';

describe('Directive: wrapIf', function () {

  // load the directive's module
  beforeEach(module('amnohfelsClientApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<wrap-if></wrap-if>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the wrapIf directive');
  }));
});
