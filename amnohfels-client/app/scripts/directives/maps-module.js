'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsClientApp.directive:mapsModule
 * @description
 * # mapsModule
 */

//TODO (1.0.1) height variable

angular.module('amnohfelsClientApp')
  .directive('mapsModule', function ($sce) {
    return {
      templateUrl: 'views/maps-module.html',
      restrict: 'E',
      scope: {
        data: '=',
        firstModule: '='
      },
      controller: function ($scope) {
        $scope.data.title = $sce.trustAsHtml($scope.data.title);
        $scope.data.description = $sce.trustAsHtml($scope.data.description);

        $scope.map = {
          center: {
            latitude: $scope.data.centerLatitude,
            longitude: $scope.data.centerLongitude
          },
          zoom: $scope.data.zoom,
          options: {
            mapTypeId: $scope.data.mapTypeId,
            mapTypeControl: $scope.data.mapTypeControl,
            streetViewControl: false
          }
        };

        $scope.polyline = {
          id: 1,
          path: $scope.data.polylinePath,
          stroke: {
            color: '#6060FB',
            weight: 3
          },
          editable: false,
          draggable: false,
          geodesic: true,
          visible: true,
          'static': true,
          icons: [{
            icon: {
              path: google.maps.SymbolPath.BACKWARD_OPEN_ARROW //jshint ignore:line
            },
            offset: '0px',
            repeat: '50px'
          }]
        };

        $scope.marker = {
          id: 0,
          coords: {
            latitude: $scope.data.markerLatitude,
            longitude: $scope.data.markerLongitude
          }
        };
      }
    };
  });
