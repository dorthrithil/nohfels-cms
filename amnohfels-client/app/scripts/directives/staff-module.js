'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsClientApp.directive:staffModule
 * @description
 * # staffModule
 */
angular.module('amnohfelsClientApp')
  .directive('staffModule', function () {
    return {
        templateUrl: 'views/staff-module.html',
        restrict: 'E',
        scope: {
            data: '='
        }
    };
  });
