'use strict';

describe('Service: scrollMagic', function () {

  // load the service's module
  beforeEach(module('amnohfelsClientApp'));

  // instantiate service
  var scrollMagic;
  beforeEach(inject(function (_scrollMagic_) {
    scrollMagic = _scrollMagic_;
  }));

  it('should do something', function () {
    expect(!!scrollMagic).toBe(true);
  });

});
