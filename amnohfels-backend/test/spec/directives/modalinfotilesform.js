'use strict';

describe('Directive: modalInfotilesForm', function () {

  // load the directive's module
  beforeEach(module('amnohfelsBackendApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<modal-infotiles-form></modal-infotiles-form>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the modalInfotilesForm directive');
  }));
});
