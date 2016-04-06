'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsClientApp.directive:calendar
 * @description
 * # calendar
 */
angular.module('amnohfelsClientApp')
  .directive('calendar', function ($sce) {
    return {
      templateUrl: 'views/calendar-module.html',
      restrict: 'E',
      scope: {
        data: '=',
        firstModule: '='
      },
      controller: function ($scope) {
        $scope.data.date = $sce.trustAsHtml($scope.data.date);
        $scope.data.title = $sce.trustAsResourceUrl($scope.data.title);
        $scope.data.description = $sce.trustAsResourceUrl($scope.data.description);
      }
    };
  });

