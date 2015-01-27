'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsClientApp.directive:fesection
 * @description
 * # fesection
 */
angular.module('amnohfelsClientApp')
  .directive('fesection', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the fesection directive');
      }
    };
  });
