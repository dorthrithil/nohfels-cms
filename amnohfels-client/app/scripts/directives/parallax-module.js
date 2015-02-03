'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsClientApp.directive:parallaxModule
 * @description
 * # parallaxModule
 */

angular.module('amnohfelsClientApp')
    .directive('parallaxModule', function ($window, $document) {
        return {
            templateUrl: 'views/parallax-module.html',
            restrict: 'E',
            scope: {
                data: '='
            },
            require: '^scaffoldModules',
            link: {
                pre: function(scope, element, attrs, scaffoldModules){

                    //TODO comment this
                    //TODO refresh on window size change
                    scope.calcBgImgSize = function(imgHeight, imgWidth){
                        var strechedImgHeight = imgHeight * ($document.width() / imgWidth);
                        var nominalValue = $document.height() * element.children().attr('data-stellar-background-ratio') + imgHeight;
                        return (strechedImgHeight > nominalValue) ? '100%' : 'auto ' + nominalValue + 'px';
                    };
                    var bgImg = new Image();
                    bgImg.onload = function() {
                        element.children().css('background-image', 'url(../' + scope.data.bgImgSrc + ')');
                        element.children().css('background-size', scope.calcBgImgSize(this.height, this.width));
                    };
                    bgImg.src = scope.data.bgImgSrc;

                    scope.notifyLoaded = scaffoldModules.notifyElementLoaded();
                }
            },
            controller: function($scope, $sce) {
                $scope.data.title = $sce.trustAsHtml($scope.data.title);
                $scope.data.caption = $sce.trustAsHtml($scope.data.caption);
            }
        };
    });
