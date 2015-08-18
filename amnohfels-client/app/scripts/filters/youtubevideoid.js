'use strict';

/**
 * @ngdoc filter
 * @name amnohfelsClientApp.filter:youtubeVideoId
 * @function
 * @description
 * # youtubeVideoId
 * Filter in the amnohfelsClientApp.
 */
angular.module('amnohfelsClientApp')
  .filter('youtubeVideoId', function () {
    return function (input) {
      var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      var match = input.match(regExp);
      if (match && match[2].length === 11) {
        return match[2];
      } else {
        console.error('youtubeVideoIdFilter: Invalid URL passed! Returned Trololo ID instead.');
        return 'sTSA_sWGM44';
      }
    };
  });
