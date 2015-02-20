'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsClientApp.directive:root
 * @description
 * # root
 */
angular.module('amnohfelsClientApp')
  .directive('root', function (parallax) {
    return {
      restrict: 'A',
      link: function postLink(scope) {
          //TODO timing evtl kritisch. wird auch vor initialem root 'setup' ausgeführt
          scope.$on('$locationChangeStart', function() {
              parallax.clear();
          });
      }
    };
  });
