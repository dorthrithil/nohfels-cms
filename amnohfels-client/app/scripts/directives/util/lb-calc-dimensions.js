'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsClientApp.directive:lbCalcDimensions
 * @description
 * # lbCalcDimensions
 * Calculates and sets the dimensions of the lightbox overlay image responsively
 */
angular.module('amnohfelsClientApp')
  .directive('lbCalcDimensions', function ($window) {
    return {
      restrict: 'A',
      link: function postLink(scope, element) {
          //load image off screen
          var buffer = new Image();
          buffer.src = element.attr("src");

          //initialize dimensions onload
          buffer.onload = function() {
              scope.setDimensions();
          };

          scope.setDimensions = function(){
              var margin = 150;
              //difference * weighting
              var widthError = (buffer.width - $window.innerWidth + margin) * buffer.height / buffer.width;
              var heightError = (buffer.height - $window.innerHeight + margin) * buffer.width / buffer.height;
              //decide how to set the dimensions based on width/heightError
              if (widthError > 0 || heightError > 0) {
                  if (widthError > heightError) {
                      element.css('width', $window.innerWidth - margin + 'px');
                      element.css('height', ($window.innerWidth - margin) * buffer.height / buffer.width + 'px');
                  } else {
                      element.css('width', ($window.innerHeight - margin) * buffer.width / buffer.height + 'px');
                      element.css('height', $window.innerHeight - margin + 'px');
                  }
              } else {
                  element.css('width', buffer.width + 'px');
                  element.css('height', buffer.height + 'px');
              }
          };

          //bind setDimensions to window resize event
          return angular.element($window).bind('resize', function() {
              scope.setDimensions();
          });
      }
    };
  });
