'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsClientApp.directive:imageModule
 * @description
 * # imageModule
 */

//TODO what happens when we have multiple image modules on one page?
//TODO templates for spaghetti angular element definitions
//TODO trigger image change animations directly with the onload event, not with a watcher which watches an attribute which gets set by the onload even
//TODO comment

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
                backdrop.append(closeIcon);
                backdrop.append(nextImageIcon);
                backdrop.append(previousImageIcon);
                var image = null;
                var changeImageMutex = false; //make sure only one image gets changed at a time

                scope.lbOpen = function(index){
                    //setup
                    image = angular.element('<img alt="" index="' + index + '" src="' + scope.data.images[index].imageSrc + '" ng-click="lbChangeImage(\'right\')" no-propagation lb-calc-dimensions/>');
                    backdrop.append(image);
                    body.append($compile(backdrop)(scope)); //compiling is necessary to wire up the used directives
                    $document.bind('keyup', lbMapKeyup);
                    //show
                    animator.stagger().fadeIn(backdrop);
                    animator.stagger().fadeIn(image);
                };

                scope.lbClose = function(){
                    //tear down everything we set up in lbOpen
                    animator.stagger().fadeOut(image).then(function(){image.remove();});
                    animator.stagger().fadeOut(backdrop).then(function(){backdrop.remove();});
                    $document.unbind('keyup', lbMapKeyup);
                };

                scope.lbChangeImage = function(direction){
                    if (!changeImageMutex) {
                        changeImageMutex = true;
                        var index = parseInt(image.attr('index'));
                        var newIndex, $icon;
                        if(direction === 'right'){
                            $icon = nextImageIcon.children().children().children();
                            newIndex = (scope.data.images.length - 1 === index) ? 0 : index + 1;
                        } else {
                            $icon = previousImageIcon.children().children().children();
                            newIndex = (index === 0) ? scope.data.images.length - 1 : index - 1;
                        }
                        var newImage = angular.element('<img alt="" index="' + newIndex + '" src="' + scope.data.images[newIndex].imageSrc + '" ng-click="lbChangeImage(right)" no-propagation preloadable lb-calc-dimensions/>');
                        backdrop.append($compile(newImage)(scope));
                        //watch for image getting loaded, then animate it
                        var startLoadingAnimation = true;
                        var loadingAnimationStarted = false;
                        $timeout(function(){
                            if(startLoadingAnimation){
                                loadingAnimationStarted = true;
                                $icon.removeClass('glyphicon-chevron-' + direction).addClass('glyphicon-refresh glyphicon-refresh-animate');
                            }
                        },500);
                        scope.$watch(function () {
                            return newImage.attr('loaded');
                        }, function (newValue) {
                            if (newValue === 'true') {
                                startLoadingAnimation = false;
                                if(loadingAnimationStarted){
                                    $icon.removeClass('glyphicon-refresh glyphicon-refresh-animate').addClass('glyphicon-chevron-' + direction);
                                }
                                if(direction === 'right'){
                                    animator.stagger().slideOutLeft(image).then(function(){image.remove();});
                                    animator.stagger().slideInRight(newImage).then(function(){
                                        image = newImage;
                                        changeImageMutex = false;
                                    });
                                } else {
                                    animator.stagger().slideOutRight(image).then(function(){image.remove();});
                                    animator.stagger().slideInLeft(newImage).then(function(){
                                        image = newImage;
                                        changeImageMutex = false;
                                    });
                                }
                            }
                        });
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