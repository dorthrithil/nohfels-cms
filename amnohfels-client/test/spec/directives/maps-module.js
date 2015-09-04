'use strict';

describe('Directive: mapsModule', function () {

  // load the directive's module
  beforeEach(module('amnohfelsClientApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<maps-module></maps-module>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the mapsModule directive');
  }));
});
