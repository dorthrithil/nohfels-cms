'use strict';

describe('Service: topicService', function () {

  // load the service's module
  beforeEach(module('amnohfelsClientApp'));

  // instantiate service
  var topicService;
  beforeEach(inject(function (_topicService_) {
    topicService = _topicService_;
  }));

  it('should do something', function () {
    expect(!!topicService).toBe(true);
  });

});
