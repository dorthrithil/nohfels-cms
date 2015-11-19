'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsClientApp.directive:wrapIf
 * @description
 * # wrapIf
 * Unwraps the element on which it is declared if wrapIf attribute is set true.
 */
angular.module('amnohfelsClientApp')
  .directive('wrapIf', function () {
    return {
      restrict: 'A',
      scope: false,
      link: function postLink(scope, element, attrs) {
        if (!scope.$eval(attrs.wrapIf)) {
          element.children().unwrap();
        }
      }
    };
  });
