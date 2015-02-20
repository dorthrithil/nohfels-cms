'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsClientApp.directive:imageModule
 * @description
 * # imageModule
 */
angular.module('amnohfelsClientApp')
    .directive('imageModule', function ($compile){
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
                    //TODO can i use a template for this ugly monster?
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
                    //TODO put this in animate service?
                    //$animate.addClass(backdrop, 'lb-fade').then(function(){console.log('resolvd');});
                    //TODO Use gsap to get rid of two animation libraries
                    backdrop.velocity({
                        opacity: 1
                    },{
                        duration: 200,
                        easing: 'easeInSine'
                    });
                    image.velocity({
                        opacity: 1
                    },{
                        duration: 200,
                        delay: 200,
                        easing: 'easeInSine'
                    });
                };

                scope.lbClose = function(){
                    var image = angular.element(document.querySelector('.lb-image'));
                    var backdrop = angular.element(document.querySelector('.lb-backdrop'));
                    image.velocity({
                        opacity: 0
                    },{
                        duration: 200,
                        easing: 'easeInSine',
                        complete: function() {
                            image.remove();
                        }
                    });
                    backdrop.velocity({
                        opacity: 0
                    },{
                        duration: 200,
                        delay: 200,
                        easing: 'easeInSine',
                        complete: function(){
                            backdrop.remove();
                        }
                    });
                };

                scope.lbNextImage = function() {
                    if (!changeImageMutex) {
                        changeImageMutex = true;
                        var backdrop = angular.element(document.querySelector('.lb-backdrop'));
                        var oldImage = angular.element(document.querySelector('.lb-image'));
                        var oldIndex = parseInt(oldImage.attr('index'));
                        var newIndex = (scope.data.images.length - 1 === oldIndex) ? 0 : oldIndex + 1;
                        //TODO use templates for huge angular elements
                        var newImage = angular.element('<img alt="" index="' + newIndex + '" src="' + scope.data.images[newIndex].imageSrc + '" class="lb-image lb-image-active lb-image-enter-right" ng-click="lbNextImage()" no-propagation preloadable lb-calc-dimensions/>');
                        backdrop.append($compile(newImage)(scope));
                        //watch for image getting loaded, then animate it
                        scope.$watch(function () {
                            return newImage.attr('loaded');
                        }, function (newValue) {
                            if (newValue === 'true') {
                                oldImage.velocity({
                                    opacity: 0,
                                    width: '0px',
                                    height: '0px',
                                    right: '100%',
                                    bottom: '100%'
                                }, {
                                    duration: 400,
                                    complete: function () {
                                        oldImage.remove();
                                        changeImageMutex = false;
                                    }
                                });
                                newImage.velocity({
                                    left: '0'
                                }, {
                                    duration: 200,
                                    delay: 200
                                });
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
                        //TODO use templates for huge angular elements
                        var newImage = angular.element('<img alt="" index="' + newIndex + '" src="' + scope.data.images[newIndex].imageSrc + '" class="lb-image lb-image-active lb-image-enter-left" ng-click="lbNextImage()" no-propagation preloadable lb-calc-dimensions/>');
                        backdrop.append($compile(newImage)(scope));
                        //watch for image getting loaded, then animate it
                        scope.$watch(function () {
                            return newImage.attr('loaded');
                        }, function (newValue) {
                            if (newValue === 'true') {
                                oldImage.velocity({
                                    opacity: 0,
                                    width: '0px',
                                    height: '0px',
                                    left: '100%',
                                    bottom: '100%'
                                }, {
                                    duration: 400,
                                    complete: function () {
                                        oldImage.remove();
                                        changeImageMutex = false;
                                    }
                                });
                                newImage.velocity({
                                    right: '0'
                                }, {
                                    duration: 200,
                                    delay: 200
                                });
                            }
                        });
                    }
                };
            }
        };
    });