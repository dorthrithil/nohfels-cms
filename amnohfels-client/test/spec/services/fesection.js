'use strict';

describe('Service: feSectionService', function () {

  // load the service's module
  beforeEach(module('amnohfelsClientApp'));

  // instantiate service
  var feSectionService;
  beforeEach(inject(function (_feSection_) {
    feSectionService = _feSection_;
  }));

  it('should do something', function () {
    expect(!!feSectionService).toBe(true);
  });

});
