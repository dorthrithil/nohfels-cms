'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsBackendApp.directive:ngFuErrorReporter
 * @description
 * # ngFuErrorReporter
 *
 * displays error messages from ngFileUpload
 *
 */

//TODO (1.0.1) dimension error is more a warning. organize errors in queue so they appear in order of appearance

angular.module('amnohfelsBackendApp')
  .directive('ngFuErrorReporter', function () {
    return {
      template: '<div ng-show="fileUploadError()" class="alert alert-danger alert-dismissible">' +
      '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
      '<span aria-hidden="true">&times;</span></button>' +
      '<div ng-repeat="fileUploadErrorMessage in fileUploadErrorMessages" ng-show="fileUploadErrorMessage.active">' +
      '<strong>Fehler: </strong>{{fileUploadErrorMessage.text}}' +
      '</div>' +
      '</div>',
      restrict: 'E',
      controller: function ($scope, $element) {
        $scope.fileUploadErrorMessages = {
          size: {
            text: 'Die Maximale Dateigröße beim Upload beträgt 4050218 Bytes (ca. 4MB)!',
            active: false
          },
          type: {
            text: 'Es sind nur Bilder im jpg, png, bmp und gif Format erlaubt!',
            active: false
          },
          dimension: {
            text: 'Das hochgeladene Bild ist kleiner als 1000px*560px. Es wird empfohlen, ein größeres Bild auszuwählen, da sonst die Darstellung auf großen Bildschirmen leiden kann.',
            active: false
          },
          unknown: {
            text: 'Es ist ein unbekannter Fehler beim Upload aufgetreten.',
            active: false
          },
          serverError: {
            text: '',
            active: false
          }
        };

        //uploader callback
        $scope.uploader.onWhenAddingFileFailed = function (item, filter) {
          switch (filter.name) {
            case 'imageFilter':
              $scope.fileUploadErrorMessages.type.active = true;
              break;
            case 'sizeFilter':
              $scope.fileUploadErrorMessages.size.active = true;
              break;
            default:
              $scope.fileUploadErrorMessages.unknown.active = true;
          }
        };

        $scope.uploader.onErrorItem = function (item, response, status) {
          $scope.fileUploadErrorMessages.serverError.active = true;
          $scope.fileUploadErrorMessages.serverError.text = 'Es ist ein Problem aufgetreten. Der Server meldet: "' +
            status + ': ' + response + '"';
        };

        //broadcasts
        $scope.$on('show-image-dimension-warning', function () {
          $scope.fileUploadErrorMessages.dimension.active = true;
        });

        //for ngIf in template
        $scope.fileUploadError = function () {
          return $scope.fileUploadErrorMessages.size.active ||
            $scope.fileUploadErrorMessages.type.active ||
            $scope.fileUploadErrorMessages.dimension.active ||
            $scope.fileUploadErrorMessages.unknown.active ||
            $scope.fileUploadErrorMessages.serverError.active;
        };

        //reset active flags when alert is dismissed
        $element.children().on('closed.bs.alert', function () {
          $scope.fileUploadErrorMessages.size.active = false;
          $scope.fileUploadErrorMessages.type.active = false;
          $scope.fileUploadErrorMessages.unknown.active = false;
          $scope.fileUploadErrorMessages.dimension.active = false;
          $scope.fileUploadErrorMessages.serverError.active = false;
        });
      }
    };
  });
