'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsClientApp.directive:calendar
 * @description
 * # calendar
 */
angular.module('amnohfelsClientApp')
  .directive('calendarModule', function ($sce) {
    return {
      templateUrl: 'views/calendar-module.html',
      restrict: 'E',
      scope: {
        data: '=',
        firstModule: '='
      },
      controller: function ($scope) {
      }
    };
  });

