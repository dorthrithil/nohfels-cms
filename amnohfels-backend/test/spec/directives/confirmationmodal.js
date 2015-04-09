'use strict';

describe('Directive: confirmationModal', function () {

  // load the directive's module
  beforeEach(module('amnohfelsBackendApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<confirmation-modal></confirmation-modal>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the confirmationModal directive');
  }));
});
