'use strict';

describe('Directive: modalTextForm', function () {

  // load the directive's module
  beforeEach(module('amnohfelsBackendApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<modal-text-form></modal-text-form>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the modalTextForm directive');
  }));
});
