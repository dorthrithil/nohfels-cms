'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsClientApp.directive:imageModule
 * @description
 * # imageModule
 */

//TODO templates for spaghetti angular element definitions

angular.module('amnohfelsClientApp')
    .directive('imageModule', function ($compile, animator, $document, $timeout){
        return {
            templateUrl: 'views/image-module.html',
            restrict: 'E',
            scope: {
                data: '='
            },
            link: function(scope){
                //init
                var body = angular.element(document).find('body');
                var backdrop = angular.element('<div class="lb-backdrop" ng-click="lbClose()"></div>');
                var closeIcon = angular.element('<div class="lb-close" ng-click="lbClose()" no-propagation><div class="lb-navigation-wrapper"><div class="lb-navigation-center"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></div></div></div>');
                var nextImageIcon = angular.element('<div class="lb-next-image" ng-click="lbChangeImage(\'right\')" no-propagation><div class="lb-navigation-wrapper"><div class="lb-navigation-center"><span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span></div></div></div>');
                var previousImageIcon = angular.element('<div class="lb-previous-image" ng-click="lbChangeImage(\'left\')" no-propagation><div class="lb-navigation-wrapper"><div class="lb-navigation-center"><span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span></div></div></div>');
                var loadingIcon = angular.element('<div class="loading"><span class="glyphicon glyphicon-refresh glyphicon-refresh-animate" aria-hidden="true"></span></div>');
                backdrop.append(closeIcon);
                backdrop.append(nextImageIcon);
                backdrop.append(previousImageIcon);
                var image = null;
                var changeImageMutex = false; //makes sure only one image gets changed at a time

                //appends lightbox to dom with animation
                scope.lbOpen = function(index){
                    image = angular.element('<img alt="" index="' + index + '" src="' + scope.data.images[index].imageSrc + '" ng-click="lbChangeImage(\'right\')" no-propagation lb-calc-dimensions preloadable/>');
                    backdrop.append(image);
                    body.append($compile(backdrop)(scope)); //compiling is necessary to wire up the used directives
                    $document.bind('keyup', lbMapKeyup);
                    animator.stagger().fadeIn(backdrop);
                    var startLoadingAnimation = true;
                    var loadingAnimationStarted = false;
                    $timeout(function(){ //if loading the image takes long, indicate with spinning glyphicon
                        if(startLoadingAnimation){
                            backdrop.append(loadingIcon);
                            loadingAnimationStarted = true;
                            animator.stagger().fadeIn(loadingIcon);
                        }
                    },500);
                    var performAnimation = function(){
                        unbindLbImageLoaded();
                        startLoadingAnimation = false;
                        if(loadingAnimationStarted){ //remove spinning icon
                            animator.stagger().fadeOut(loadingIcon).then(function(){loadingIcon.remove();});
                        }
                        animator.stagger().fadeIn(image);
                    };
                    var unbindLbImageLoaded = scope.$on('lbImageLoaded', performAnimation);
                };

                //removes all lightbox from dom with animation
                scope.lbClose = function(){
                    animator.stagger().fadeOut(image).then(function(){image.remove();});
                    animator.stagger().fadeOut(backdrop).then(function(){backdrop.remove();});
                    $document.unbind('keyup', lbMapKeyup);
                };

                scope.lbChangeImage = function(direction){
                    if (!changeImageMutex) {
                        changeImageMutex = true;
                        var index = parseInt(image.attr('index')); //get the actual index
                        var newIndex, $icon;
                        if(direction === 'right'){ //initialize icon and new index
                            $icon = nextImageIcon.children().children().children();
                            newIndex = (scope.data.images.length - 1 === index) ? 0 : index + 1;
                        } else {
                            $icon = previousImageIcon.children().children().children();
                            newIndex = (index === 0) ? scope.data.images.length - 1 : index - 1;
                        }
                        var newImage = angular.element('<img alt="" index="' + newIndex + '" src="' + scope.data.images[newIndex].imageSrc + '" ng-click="lbChangeImage(' + direction + ')" no-propagation preloadable lb-calc-dimensions/>');
                        backdrop.append($compile(newImage)(scope)); //append new image (outside of viewport)
                        var startLoadingAnimation = true;
                        var loadingAnimationStarted = false;
                        $timeout(function(){ //if loading the new image takes long, indicate with spinning glyphicon
                            if(startLoadingAnimation){
                                loadingAnimationStarted = true;
                                $icon.removeClass('glyphicon-chevron-' + direction).addClass('glyphicon-refresh glyphicon-refresh-animate');
                            }
                        },500);

                        var performAnimation = function(){
                            unbindLbImageLoaded();
                            startLoadingAnimation = false;
                            if(loadingAnimationStarted){ //remove spinning icon
                                $icon.removeClass('glyphicon-refresh glyphicon-refresh-animate').addClass('glyphicon-chevron-' + direction);
                            }
                            if(direction === 'right'){ //...animate
                                animator.stagger().slideOutLeft(image).then(function(){image.remove();});
                                animator.stagger().slideInRight(newImage).then(function(){
                                    image.remove();
                                    image = newImage; //make it reentrantable
                                    changeImageMutex = false;
                                });
                            } else {
                                animator.stagger().slideOutRight(image).then(function(){image.remove();});
                                animator.stagger().slideInLeft(newImage).then(function(){
                                    image = newImage;
                                    changeImageMutex = false;
                                });
                            }
                        };

                        var unbindLbImageLoaded = scope.$on('lbImageLoaded', performAnimation);
                    }
                };

                var lbMapKeyup = function(keyEvent){
                    //right arrow
                    if (keyEvent.which === 39){
                        scope.lbChangeImage('right');
                    }
                    //left arrow
                    if (keyEvent.which === 37){
                        scope.lbChangeImage('left');
                    }
                    //esc
                    if (keyEvent.which === 27){
                        scope.lbClose();
                    }
                };
            }
        };
    });