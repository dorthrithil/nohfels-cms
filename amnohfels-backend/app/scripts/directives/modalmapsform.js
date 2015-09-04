'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsBackendApp.directive:modalMapsForm
 * @description
 * # modalMapsForm
 */

//TODO build all default modal vars as objects..
//TODO (1.0.1) polyline path with comfortable
//TODO (1.0.2) use an example map for all the settings with custom events which export the location comfortably in the model (no switching between nohfels & gmaps needed anymore)

angular.module('amnohfelsBackendApp')
  .directive('modalMapsForm', function (util) {
    return {
      templateUrl: 'views/modalmapsform.html',
      restrict: 'E',
      controller: function ($scope) {
        if ($scope.modalVars.action === 'create') {
          $scope.modalVars.data = {
            title: '',
            description: '',
            centerLatitude: 49.778841,
            centerLongitude: 7.659068,
            marker: true,
            markerLatitude: 49.778841,
            markerLongitude: 7.659068,
            zoom: 15,
            mapTypeControl: false,
            mapTypeId: 'terrain',
            polyline: false,
            polylinePath: '[{"latitude": 49.776861,"longitude": 7.660168},{"latitude": 49.777448,"longitude": 7.660405},' +
            '{"latitude": 49.777755,"longitude": 7.660305}]'
          };
        } else {
          $scope.modalVars.data.polylinePath = JSON.stringify($scope.modalVars.data.polylinePath);
        }
        $scope.modalVars.route = '/maps';
        $scope.modalVars.data.pageTopic = $scope.pageTopic;

        // function for stripping pasted text in editor off styles
        $scope.modifyHtml = util.taModifyHtml;

        // data for popovers
        $scope.popovers = {
          center: {
            title: 'Kartenmittelpunkt',
            content: 'Der Kartenmittelpunkt (angegeben in Dezimalgrad Koordinaten) gibt den initialen Mittelpunkt' +
            ' der Karte an. Koordinaten kannst du idealerweise direkt aus Google Maps entnehmen.'
          },
          marker: {
            title: 'Marker',
            content: 'Der Marker ist eine Markierung auf der Karte, der den genauen Standort deines Unternehmens auf' +
            ' der Karte markieren kann.'
          },
          zoom: {
            title: 'Zoomlevel',
            content: 'Der Zoomlevel gibt an, wie weit die Karte im initialen Zustand herangezoomt ist. Den richtigen' +
            ' Wert kannst du am einfachsten durch ausprobieren herausfinden.'
          },
          mapTypeId: {
            title: 'Kartentyp',
            content: 'Es gibt vier verschiedene Kartentypen. Die standard Straßenkarte, die Terrain Karte' +
            ' (Straßenkarte mit Terrain und Vegetation), die Satellitenkarte und die Hybridkarte (Satellitenkarte' +
            ' mit Straßenkarten Overlay).'
          },
          mapTypeControl: {
            title: 'Kartentyp Kontroll Button',
            content: 'Mit dieser Option aktiviert, können Benutzer zwischen den verschiedenen Kartentypen umschalten.' +
            ' Auf kleinen Bildschirmen wird von dem Button allerdings etwas Kartenfläche verdeckt. Hier musst du' +
            ' selbst entscheiden, was dir am besten gefällt.'
          },
          polyline: {
            title: 'Polyline Pfad',
            content: 'Mit dieser fortgeschrittenen Option kannst du einen Pfad definieren, der mit Richtungspfeilen' +
            ' auf der Karte angezeigt wird. Zur Zeit ist die Unterstützung für dieses Feature noch nicht sehr gut. Es' +
            ' wird etwas Programmierkenntnis vorausgesetzt. Als Input wird ein JSON Array mit Koordinaten der' +
            ' Eckpunkte des Pfades verlangt. Als Default Wert ist ein Beispiel gesetzt.'
          }
        };
      }
    };
  });
