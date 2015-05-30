'use strict';

describe('Service: translations', function () {

  // load the service's module
  beforeEach(module('amnohfelsBackendApp'));

  // instantiate service
  var translations;
  beforeEach(inject(function (_translations_) {
    translations = _translations_;
  }));

  it('should do something', function () {
    expect(!!translations).toBe(true);
  });

});
