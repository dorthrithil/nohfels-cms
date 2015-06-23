'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsClientApp.directive:page
 * @description
 * # page
 */
angular.module('amnohfelsClientApp')
  .directive('page', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element) {
        element.text('this is the page directive');
      }
    };
  });
