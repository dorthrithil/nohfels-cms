'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsClientApp.directive:calcRealDimensions
 * @description
 * # calcRealDimensions
 */
angular.module('amnohfelsClientApp')
  .directive('lbCalcDimensions', function ($window) {
    return {
      restrict: 'A',
      link: function postLink(scope, element) {
          var buffer = new Image();
          buffer.src = element.attr("src");
          element.attr('native-width', buffer.width);
          element.attr('native-height', buffer.height);

          scope.setDimensions = function(){
              //TODO really use percentage for margin setting?
              //difference * weighting
              var widthError = (buffer.width - $window.innerWidth * 0.8) * buffer.height / buffer.width;
              var heightError = (buffer.height - $window.innerHeight * 0.8) * buffer.width / buffer.height;
              if (widthError > 0 && heightError > 0) {
                  if (widthError > heightError) {
                      element.css('width', $window.innerWidth * 0.8 + 'px');
                      element.css('height', $window.innerWidth * 0.8 * buffer.height / buffer.width + 'px');
                  } else {
                      element.css('width', $window.innerHeight * 0.8 * buffer.width / buffer.height + 'px');
                      element.css('height', $window.innerHeight * 0.8 + 'px');
                  }
              } else {
                  element.css('width', buffer.width + 'px');
                  element.css('height', buffer.height + 'px');
              }
          };

          return angular.element($window).bind('resize', function() {
              scope.setDimensions();
          });
      }
    };
  });
