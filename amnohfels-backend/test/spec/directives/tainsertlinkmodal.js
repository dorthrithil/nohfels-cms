'use strict';

describe('Directive: taInsertLinkModal', function () {

  // load the directive's module
  beforeEach(module('amnohfelsBackendApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ta-insert-link-modal></ta-insert-link-modal>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the taInsertLinkModal directive');
  }));
});
