'use strict';

describe('Directive: modalParallaxForm', function () {

  // load the directive's module
  beforeEach(module('amnohfelsBackendApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<modal-parallax-form></modal-parallax-form>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the modalParallaxForm directive');
  }));
});
