'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsClientApp.directive:imageModule
 * @description
 * # imageModule
 */

//TODO what happens when we have multiple image modules on one page?
//TODO templates for spaghetti angular element definitions
//TODO factor out animations - maybe use animate service?
//TODO trigger image change animations directly with the onload event, not with a watcher which watches an attribute which gets set by the onload even

angular.module('amnohfelsClientApp')
    .directive('imageModule', function ($compile, animator){
        return {
            templateUrl: 'views/image-module.html',
            restrict: 'E',
            scope: {
                data: '='
            },
            link: function(scope){
                var body = angular.element(document).find('body');
                var changeImageMutex = false;

                scope.lbOpen = function(index){
                    var backdrop = angular.element('<div class="lb-backdrop" ng-click="lbClose()"></div>');
                    var image = angular.element('<img alt="" index="' + index + '" src="' + scope.data.images[index].imageSrc + '" class="lb-image" ng-click="lbNextImage()" no-propagation lb-calc-dimensions/>');
                    var closeIcon = angular.element('<div class="lb-close" ng-click="lbClose()" no-propagation><div class="lb-navigation-wrapper"><div class="lb-navigation-center"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></div></div></div>');
                    var nextImageIcon = angular.element('<div class="lb-next-image" ng-click="lbNextImage()" no-propagation><div class="lb-navigation-wrapper"><div class="lb-navigation-center"><span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span></div></div></div>');
                    var previousImageIcon = angular.element('<div class="lb-previous-image" ng-click="lbPreviousImage()" no-propagation><div class="lb-navigation-wrapper"><div class="lb-navigation-center"><span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span></div></div></div>');
                    body.append($compile(backdrop)(scope));
                    backdrop.append($compile(image)(scope));
                    backdrop.append($compile(closeIcon)(scope));
                    backdrop.append($compile(nextImageIcon)(scope));
                    backdrop.append($compile(previousImageIcon)(scope));
                    animator.fadeIn(backdrop);
                    animator.fadeIn(image, 200);
                };

                scope.lbClose = function(){
                    var image = angular.element(document.querySelector('.lb-image'));
                    var backdrop = angular.element(document.querySelector('.lb-backdrop'));
                    animator.fadeOutAndRemove(image);
                    animator.fadeOutAndRemove(backdrop, 200);
                };

                scope.lbNextImage = function() {
                    if (!changeImageMutex) {
                        changeImageMutex = true;
                        var backdrop = angular.element(document.querySelector('.lb-backdrop'));
                        var oldImage = angular.element(document.querySelector('.lb-image'));
                        var oldIndex = parseInt(oldImage.attr('index'));
                        var newIndex = (scope.data.images.length - 1 === oldIndex) ? 0 : oldIndex + 1;
                        var newImage = angular.element('<img alt="" index="' + newIndex + '" src="' + scope.data.images[newIndex].imageSrc + '" class="lb-image lb-image-active lb-image-enter-right" ng-click="lbNextImage()" no-propagation preloadable lb-calc-dimensions/>');
                        backdrop.append($compile(newImage)(scope));
                        //watch for image getting loaded, then animate it
                        scope.$watch(function () {
                            return newImage.attr('loaded');
                        }, function (newValue) {
                            if (newValue === 'true') {
                                animator.flyOutLeft(oldImage).then(function(){changeImageMutex = false;});
                                animator.slideInFromRight(newImage, 200);
                            }
                        });
                    }
                };
                scope.lbPreviousImage = function() {
                    if (!changeImageMutex) {
                        changeImageMutex = true;
                        var backdrop = angular.element(document.querySelector('.lb-backdrop'));
                        var oldImage = angular.element(document.querySelector('.lb-image'));
                        var oldIndex = parseInt(oldImage.attr('index'));
                        var newIndex = (oldIndex === 0) ? scope.data.images.length - 1 : oldIndex - 1;
                        var newImage = angular.element('<img alt="" index="' + newIndex + '" src="' + scope.data.images[newIndex].imageSrc + '" class="lb-image lb-image-active lb-image-enter-left" ng-click="lbNextImage()" no-propagation preloadable lb-calc-dimensions/>');
                        backdrop.append($compile(newImage)(scope));
                        //watch for image getting loaded, then animate it
                        scope.$watch(function () {
                            return newImage.attr('loaded');
                        }, function (newValue) {
                            if (newValue === 'true') {
                                animator.flyOutRight(oldImage).then(function(){changeImageMutex = false;});
                                animator.slideInFromLeft(newImage, 200);
                            }
                        });
                    }
                };
            }
        };
    });