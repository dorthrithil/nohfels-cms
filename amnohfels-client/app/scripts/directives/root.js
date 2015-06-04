'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsClientApp.directive:root
 * @description
 * # root
 */

//TODO (1.0.0) this can be added to parallax service listening to rootscope

angular.module('amnohfelsClientApp')
  .directive('root', function (parallax) {
    return {
      restrict: 'A',
      link: function postLink(scope) {
          scope.$on('$locationChangeStart', function() {
              parallax.clear();
          });
      }
    };
  });
