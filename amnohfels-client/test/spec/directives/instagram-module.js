'use strict';

describe('Directive: instagramModule', function () {

  // load the directive's module
  beforeEach(module('amnohfelsClientApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<instagram-module></instagram-module>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the instagramModule directive');
  }));
});
