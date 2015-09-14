'use strict';

describe('Service: preloadData', function () {

  // load the service's module
  beforeEach(module('amnohfelsClientApp'));

  // instantiate service
  var preloadData;
  beforeEach(inject(function (_preloadData_) {
    preloadData = _preloadData_;
  }));

  it('should do something', function () {
    expect(!!preloadData).toBe(true);
  });

});
