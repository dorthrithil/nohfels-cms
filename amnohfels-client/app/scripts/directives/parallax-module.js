'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsClientApp.directive:parallaxModule
 * @description
 * # parallaxModule
 */

angular.module('amnohfelsClientApp')
    .directive('parallaxModule', function ($document, $window) {
        return {
            templateUrl: 'views/parallax-module.html',
            restrict: 'E',
            scope: {
                data: '='
            },
            require: '^scaffoldModules',
            link: {
                pre: function(scope, element, attrs, scaffoldModules){
                    var bgImgHeight = 0, bgImgWidth = 0;

                    scope.calcBgImgSize = function(imgHeight, imgWidth){
                        //this is the resulting height, if we strech the image to 100% window width
                        var strechedImgHeight = imgHeight * ($document.width() / imgWidth);
                        //our image has to be at least as high as the window + the extra hight needed for parallax scolling
                        var nominalValue = $document.height() * element.children().attr('data-stellar-background-ratio') + imgHeight;
                        //if it's higher, we can use 100% width (this way we can see more), otherwise use nominalValue as height
                        return (strechedImgHeight > nominalValue) ? '100%' : 'auto ' + nominalValue + 'px';
                    };

                    //Get orininal image properties and initialize background-size
                    var bgImg = new Image();
                    bgImg.onload = function() {
                        bgImgHeight = this.height;
                        bgImgWidth = this.width;
                        scope.refreshBackgroundSize();
                    };
                    bgImg.src = scope.data.bgImgSrc;

                    scope.refreshBackgroundSize = function(){
                        element.children().css('background-size', scope.calcBgImgSize(bgImgHeight, bgImgWidth));
                    };

                    //notify scaffoldModules for stellar initialization
                    scope.notifyLoaded = scaffoldModules.notifyElementLoaded();
                }
            },
            controller: function($scope, $sce) {
                $scope.data.title = $sce.trustAsHtml($scope.data.title);
                $scope.data.caption = $sce.trustAsHtml($scope.data.caption);

                //watch for window resize to change background size
                return angular.element($window).bind('resize', function() {
                    $scope.refreshBackgroundSize();
                });
            }
        };
    });
