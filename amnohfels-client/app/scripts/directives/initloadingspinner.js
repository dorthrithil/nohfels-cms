'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsClientApp.directive:initLoadingSpinner
 * @description
 * # initLoadingSpinner
 */
angular.module('amnohfelsClientApp')
  .directive('initLoadingSpinner', function () {
    return {
      template: '<span us-spinner="{color:\'#000\',radius:80, width:15, length: 8, ' +
        'lines: 9, corners: 1}"  spinner-on="true"></span>',
      restrict: 'E'
    };
  });
