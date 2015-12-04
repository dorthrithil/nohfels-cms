'use strict';

describe('Directive: initLoadingSpinner', function () {

  // load the directive's module
  beforeEach(module('amnohfelsClientApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<init-loading-spinner></init-loading-spinner>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the initLoadingSpinner directive');
  }));
});
