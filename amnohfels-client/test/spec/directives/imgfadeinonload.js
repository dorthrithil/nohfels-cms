'use strict';

describe('Directive: imgFadeInOnload', function () {

  // load the directive's module
  beforeEach(module('amnohfelsClientApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<img-fade-in-onload></img-fade-in-onload>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the imgFadeInOnload directive');
  }));
});
