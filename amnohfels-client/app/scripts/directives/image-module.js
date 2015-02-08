'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsClientApp.directive:imageModule
 * @description
 * # imageModule
 */
angular.module('amnohfelsClientApp')
    .directive('imageModule', function ($timeout, $compile) {
        return {
            templateUrl: 'views/image-module.html',
            restrict: 'E',
            scope: {
                data: '='
            },
            link: function(scope){
                var body = angular.element(document).find('body');
                var backdrop = angular.element('<div class="lightbox-backdrop" ng-click="closeLightbox()"></div>');
                scope.openLightbox = function(index){
                    var image = angular.element('<img alt="" src="' + scope.data.thumbnails[index].imageSrc + '" class="lightbox-image" />');
                    body.append($compile(backdrop)(scope));
                    backdrop.append(image);
                    $timeout(function () {
                        backdrop.addClass('lightbox-backdrop-active');
                        image.addClass('lightbox-image-active');
                    });
                };
                scope.closeLightbox = function(){
                    backdrop.removeClass('lightbox-backdrop-active');
                    backdrop.children().removeClass('lightbox-image-active');
                    $timeout(function () {
                        backdrop.children().remove();
                        backdrop.remove();
                    }, 2);
                };
            }
        };
    });