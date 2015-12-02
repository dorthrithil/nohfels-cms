'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsClientApp.directive:imgFadeInOnload
 * @description
 * # imgFadeInOnload
 * fades in an image when it's completely loaded. for this directive to work the src attribute of the image must be
 * empty. instead the image source path must be passed as attribute value for `img-fade-in-onload`.
 */

//TODO (1.0.0) am i using this?

angular.module('amnohfelsClientApp')
  .directive('imgFadeInOnload', function (animator) {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attr) {
        // hide image
        element.css('opacity', 0);
        // bind fadeIn animation to image onload
        element.bind('load', function () {
          animator.fadeIn(element);
        });
        // load image
        element.attr('src', attr.imgFadeInOnload);
      }
    };
  });
