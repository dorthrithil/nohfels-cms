'use strict';

describe('Service: animator', function () {

  // load the service's module
  beforeEach(module('amnohfelsClientApp'));

  // instantiate service
  var animator;
  beforeEach(inject(function (_animator_) {
    animator = _animator_;
  }));

  it('should do something', function () {
    expect(!!animator).toBe(true);
  });

});
