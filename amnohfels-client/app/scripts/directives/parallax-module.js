'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsClientApp.directive:parallaxModule
 * @description
 * # parallaxModule
 */

//TODO fadeIn image onload

angular.module('amnohfelsClientApp')
    .directive('parallaxModule', function (parallax) {
        return {
            templateUrl: 'views/parallax-module.html',
            restrict: 'E',
            scope: {
                data: '='
            },
            link: {
                pre: function(scope, element){
                    parallax.add(element, scope.data.bgImgSrc);
                }
            },
            controller: function($scope, $sce) {
                $scope.data.title = $sce.trustAsHtml($scope.data.title);
                $scope.data.caption = $sce.trustAsHtml($scope.data.caption);
            }
        };
    });
