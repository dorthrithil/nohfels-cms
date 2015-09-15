'use strict';

describe('Service: preloadStatusAnimationService', function () {

  // load the service's module
  beforeEach(module('amnohfelsClientApp'));

  // instantiate service
  var preloadStatus;
  beforeEach(inject(function (_preloadStatus_) {
    preloadStatus = _preloadStatus_;
  }));

  it('should do something', function () {
    expect(!!preloadStatus).toBe(true);
  });

});
