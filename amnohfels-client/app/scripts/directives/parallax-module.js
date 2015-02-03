'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsClientApp.directive:parallaxModule
 * @description
 * # parallaxModule
 */

angular.module('amnohfelsClientApp')
    .directive('parallaxModule', function () {
        return {
            templateUrl: 'views/parallax-module.html',
            restrict: 'E',
            scope: {
                data: '='
            },
            require: '^scaffoldModules',
            link: {
                pre: function(scope, element, attrs, scaffoldModules){
                    scope.notifyLoaded = scaffoldModules.notifyElementLoaded();
                }
            },
            controller: function($scope, $sce) {
                $scope.data.title = $sce.trustAsHtml($scope.data.title);
                $scope.data.caption = $sce.trustAsHtml($scope.data.caption);
            }
        };
    });
