'use strict';

describe('Service: weatherService', function () {

  // load the service's module
  beforeEach(module('amnohfelsBackendApp'));

  // instantiate service
  var weatherHistory;
  beforeEach(inject(function (_weatherHistory_) {
    weatherHistory = _weatherHistory_;
  }));

  it('should do something', function () {
    expect(!!weatherHistory).toBe(true);
  });

});
