'use strict';

describe('Service: doorman', function () {

  // load the service's module
  beforeEach(module('amnohfelsBackendApp'));

  // instantiate service
  var doorman;
  beforeEach(inject(function (_doorman_) {
    doorman = _doorman_;
  }));

  it('should do something', function () {
    expect(!!doorman).toBe(true);
  });

});
