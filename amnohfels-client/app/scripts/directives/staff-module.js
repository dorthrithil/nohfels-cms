'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsClientApp.directive:staffModule
 * @description
 * # staffModule
 */

angular.module('amnohfelsClientApp')
  .directive('staffModule', function (config) {
    return {
      templateUrl: 'views/staff-module.html',
      restrict: 'E',
      scope: {
        data: '=',
        firstModule: '='
      },
      controller: function ($scope) {
        // prepend imageSrc - we can't inject serverRoot in deckgrid
        for (var i = 0; i < $scope.data.employees.length; i++) {
          $scope.data.employees[i].imageSrc = config.server.root + $scope.data.employees[i].imageSrc;
        }
      }
    };
  });
