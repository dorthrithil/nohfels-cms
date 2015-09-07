'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsClientApp.directive:infotileModule
 * @description
 * # infotileModule
 */
angular.module('amnohfelsClientApp')
  .directive('infotileModule', function (config) {
    return {
      templateUrl: 'views/infotilemodule.html',
      restrict: 'E',
      scope: {
        data: '=',
        firstModule: '='
      },
      controller: function ($scope) {
        // prepend imageSrc - we can't inject serverRoot in deckgrid
        for (var i = 0; i < $scope.data.infotiles.length; i++) {
          $scope.data.infotiles[i].imageSrc = config.server.root + $scope.data.infotiles[i].imageSrc;
        }
      }
    };
  });
