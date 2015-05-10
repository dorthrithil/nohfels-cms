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
angular.module('amnohfelsBackendApp')
    .directive('ngFuErrorReporter', function () {
        return {
            template: '<div ng-show="fileUploadError()" class="alert alert-danger alert-dismissible">'
                + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'//jshint ignore:line
                + '<div ng-repeat="fileUploadErrorMessage in fileUploadErrorMessages" ng-show="fileUploadErrorMessage.active">'//jshint ignore:line
                + '<strong>Fehler: </strong>{{fileUploadErrorMessage.text}}'//jshint ignore:line
                + '</div>'//jshint ignore:line
                + '</div>',//jshint ignore:line
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
                    unknown: {
                        text: 'Es ist ein unbekannter Fehler beim Upload aufgetreten.',
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

                //for ngIf in template
                $scope.fileUploadError = function () {
                    return $scope.fileUploadErrorMessages.size.active || $scope.fileUploadErrorMessages.type.active || $scope.fileUploadErrorMessages.unknown.active;
                };

                //reset active flags when alert is dismissed
                $element.children().on('closed.bs.alert', function () {
                    $scope.fileUploadErrorMessages.size.active = false;
                    $scope.fileUploadErrorMessages.type.active = false;
                    $scope.fileUploadErrorMessages.unknown.active = false;
                });
            }
        };
    });
