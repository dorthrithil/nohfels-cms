'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsClientApp.directive:parallaxModule
 * @description
 * # parallaxModule
 */

angular.module('amnohfelsClientApp')
    .directive('parallaxModule', function ($timeout, $window) {
        return {
            templateUrl: 'views/parallax-module.html',
            restrict: 'E',
            scope: {
                data: '='
            },
            link: function() {
                $timeout(function () {
                    angular.element($window).stellar({
                        horizontalScrolling: false,
                        verticalScrolling: true,
                        verticalOffset: 50
                    });
                });
            },
            controller: function($scope, $sce) {
                $scope.data.title = $sce.trustAsHtml($scope.data.title);
                $scope.data.caption = $sce.trustAsHtml($scope.data.caption);
            }
        };
    });
