'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsClientApp.directive:imageModule
 * @description
 * # imageModule
 */
angular.module('amnohfelsClientApp')
    .directive('imageModule', function ($timeout, $compile, $animate) {
        return {
            templateUrl: 'views/image-module.html',
            restrict: 'E',
            scope: {
                data: '='
            },
            link: function(scope){
                var body = angular.element(document).find('body');
                var backdrop = angular.element('<div class="lb-backdrop" ng-click="lbClose()"></div>');
                scope.lbOpen = function(index){
                    var image = angular.element('<img alt="" index="' + index + '" src="' + scope.data.thumbnails[index].imageSrc + '" class="lb-image" ng-click="lbNextImage()" no-propagation/>');
                    body.append($compile(backdrop)(scope));
                    backdrop.append($compile(image)(scope));
                    $animate.addClass(backdrop, 'lb-backdrop-active');
                    $animate.addClass(image, 'lb-image-active');
                };
                scope.lbClose = function(){
                    $animate.removeClass(backdrop, 'lb-backdrop-active');
                    $animate.removeClass(backdrop.children(), 'lb-image-active');
                    $timeout(function () {
                        backdrop.children().remove();
                        backdrop.remove();
                    }, 150);
                };
                scope.lbNextImage = function(){
                    var oldImage = angular.element(document.querySelector('.lb-image'));
                    var oldIndex = parseInt(oldImage.attr('index'));
                    var newIndex = (scope.data.thumbnails.length - 1 === oldIndex) ? 0 : oldIndex + 1;
                    var newImage = angular.element('<img alt="" index="' + newIndex + '" src="' + scope.data.thumbnails[newIndex].imageSrc + '" class="lb-image lb-image-active lb-image-enter-right" ng-click="lbNextImage()" no-propagation/>');
                    backdrop.append($compile(newImage)(scope));
                    $animate.addClass(oldImage, 'lb-image-vanish-left');
                    $animate.removeClass(newImage, 'lb-image-enter-right');
                    $timeout(function () {
                        oldImage.removeClass('lb-image-leave-left');//TODO destroy it!
                        oldImage.remove();
                    }, 150);
                };
            }
        };
    });