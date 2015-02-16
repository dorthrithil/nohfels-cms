'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsClientApp.directive:parallaxModule
 * @description
 * # parallaxModule
 */

angular.module('amnohfelsClientApp')
    .directive('parallaxModule', function ($document, $window, scrollMagic) {
        return {
            templateUrl: 'views/parallax-module.html',
            restrict: 'E',
            scope: {
                data: '='
            },
            link: {
                pre: function(scope, element){
                    var bgImgHeight = 0, bgImgWidth = 0;
                    var parallaxRatio = 0.2;

                    scope.calcBgImgSizes = function(imgHeight, imgWidth){
                        var sizes = {};
                        //this is the resulting height, if we strech the image to 100% window width
                        var strechedImgHeight = imgHeight * ($document.width() / imgWidth);
                        //our image has to be at least as high as the window + the extra hight needed for parallax scolling
                        var nominalValue = $document.height() * parallaxRatio + imgHeight;
                        //if it's higher, we can use 100% width (this way we can see more), otherwise use nominalValue as height
                        if(strechedImgHeight > nominalValue){
                            sizes.bg = '100%';
                            sizes.margin = '-50%';
                        } else {
                            sizes.bg = 'auto ' + nominalValue + 'px';
                            sizes.margin = '-50%';
                        }
                        return sizes;
                    };

                    //Get orininal image properties and initialize background-size
                    var bgImg = new Image();
                    bgImg.onload = function() {
                        bgImgHeight = this.height;
                        bgImgWidth = this.width;
                        scope.refreshBackgroundSizes();
                    };
                    bgImg.src = scope.data.bgImgSrc;

                    scope.refreshBackgroundSizes = function(){
                        var sizes = scope.calcBgImgSizes(bgImgHeight, bgImgWidth);
                        element.children().children('.parallax-image')
                            .css('background-size', sizes.bg);
                            //.css('margin-left', sizes.margin);
                    };

                    //TODO calcBgImageSize has to fit new view structure
                    new ScrollScene({triggerElement: element.children()})
                        .setTween(TweenMax.from(element.children().children('.parallax-image'), 1, {top: '-150%', ease: Linear.easeNone, force3D: true}))
                        .addTo(scrollMagic.get());
                }
            },
            controller: function($scope, $sce) {
                $scope.data.title = $sce.trustAsHtml($scope.data.title);
                $scope.data.caption = $sce.trustAsHtml($scope.data.caption);

                //TODO this doesn't belong into the controllerx
                //watch for window resize to change background size
                return angular.element($window).bind('resize', function() {
                    $scope.refreshBackgroundSizes();
                });
            }
        };
    });
