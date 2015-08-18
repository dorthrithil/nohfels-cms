'use strict';

describe('Filter: youtubeVideoId', function () {

  // load the filter's module
  beforeEach(module('amnohfelsClientApp'));

  // initialize a new instance of the filter before each test
  var youtubeVideoId;
  beforeEach(inject(function ($filter) {
    youtubeVideoId = $filter('youtubeVideoId');
  }));

  it('should return the input prefixed with "youtubeVideoId filter:"', function () {
    var text = 'angularjs';
    expect(youtubeVideoId(text)).toBe('youtubeVideoId filter: ' + text);
  });

});
