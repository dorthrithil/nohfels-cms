'use strict';

describe('Service: googleAPI', function () {

  // load the service's module
  beforeEach(module('amnohfelsBackendApp'));

  // instantiate service
  var googleAPI;
  beforeEach(inject(function (_googleAPI_) {
    googleAPI = _googleAPI_;
  }));

  it('should do something', function () {
    expect(!!googleAPI).toBe(true);
  });

});
