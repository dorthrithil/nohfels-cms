'use strict';

describe('Directive: status404', function () {

  // load the directive's module
  beforeEach(module('amnohfelsClientApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<status404></status404>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the status404 directive');
  }));
});
