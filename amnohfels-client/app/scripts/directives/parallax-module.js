'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsClientApp.directive:parallaxModule
 * @description
 * # parallaxModule
 */

//TODO fadeIn image onload

angular.module('amnohfelsClientApp')
    .directive('parallaxModule', function (parallax, $window, $timeout) {
        return {
            templateUrl: 'views/parallax-module.html',
            restrict: 'E',
            scope: {
                data: '=',
                firstModule: '='
            },
            link: {
                pre: function(scope, element){
                    parallax.add(element, scope.data.bgImgSrc, scope.data.heightNum + scope.data.heightUnit);
                }
            },
            controller: function($scope, $sce) {
                $scope.data.title = $sce.trustAsHtml($scope.data.title);
                $scope.data.caption = $sce.trustAsHtml($scope.data.caption);

                //let the scroll hint vanish on first scroll event
                $scope.scrollHintOpacity = 1; //initial opacity
                var hideScrollHint = function(){
                    angular.element($window).unbind('scroll', hideScrollHint); //unbind again for better performance
                    $timeout(function(){ //use timeout to invoke an new digest cycle so getScrollHintOpacity gets called again and changes can take effect
                        $scope.scrollHintOpacity = 0;
                    });
                };
                if ($scope.firstModule){
                    angular.element($window).bind('scroll', hideScrollHint); //bind to (first) scroll event
                }
                $scope.getScrollHintOpacity = function(){ //function returning opacity object for ngStyle
                    return {
                        opacity : $scope.scrollHintOpacity
                    };
                };
            }
        };
    });
