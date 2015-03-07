'use strict';

describe('Directive: keyPressUp', function () {

  // load the directive's module
  beforeEach(module('amnohfelsClientApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<key-press-up></key-press-up>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the keyPressUp directive');
  }));
});
