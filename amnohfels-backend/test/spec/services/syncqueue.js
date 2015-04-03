'use strict';

describe('Service: syncQueue', function () {

  // load the service's module
  beforeEach(module('amnohfelsBackendApp'));

  // instantiate service
  var syncQueue;
  beforeEach(inject(function (_syncQueue_) {
    syncQueue = _syncQueue_;
  }));

  it('should do something', function () {
    expect(!!syncQueue).toBe(true);
  });

});
