'use strict';

describe('Service: backgroundProvider', function () {

  // load the service's module
  beforeEach(module('amnohfelsBackendApp'));

  // instantiate service
  var backgroundProvider;
  beforeEach(inject(function (_backgroundProvider_) {
    backgroundProvider = _backgroundProvider_;
  }));

  it('should do something', function () {
    expect(!!backgroundProvider).toBe(true);
  });

});
