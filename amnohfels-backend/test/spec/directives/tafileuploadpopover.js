'use strict';

describe('Directive: taFileuploadPopover', function () {

  // load the directive's module
  beforeEach(module('amnohfelsBackendApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ta-fileupload-popover></ta-fileupload-popover>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the taFileuploadPopover directive');
  }));
});
