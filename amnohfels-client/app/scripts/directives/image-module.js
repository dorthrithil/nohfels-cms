'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsClientApp.directive:imageModule
 * @description
 * # imageModule
 */
angular.module('amnohfelsClientApp')
    .directive('imageModule', function ($compile) {
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
                    //TODO can i use a template for this ugly monster?
                    var image = angular.element('<img alt="" index="' + index + '" src="' + scope.data.images[index].imageSrc + '" class="lb-image" ng-click="lbNextImage()" no-propagation lb-calc-dimensions/>');
                    body.append($compile(backdrop)(scope));
                    backdrop.append($compile(image)(scope));
                    backdrop.velocity({
                        opacity: 1
                    },{
                        duration: 300
                    });
                    image.velocity({
                        opacity: 1
                    },{
                        duration: 300,
                        delay: 300
                    });
                };

                scope.lbClose = function(){
                    var image = angular.element(document.querySelector('.lb-image'));
                    image.velocity({
                        opacity: 0
                    },{
                        duration: 300,
                        complete: function() {
                            image.remove();
                        }
                    });
                    backdrop.velocity({
                        opacity: 0
                    },{
                        duration: 300,
                        delay: 300,
                        complete: function(){
                            backdrop.remove();
                        }
                    });
                };

                scope.lbNextImage = function(){
                    var oldImage = angular.element(document.querySelector('.lb-image'));
                    var oldIndex = parseInt(oldImage.attr('index'));
                    var newIndex = (scope.data.images.length - 1 === oldIndex) ? 0 : oldIndex + 1;
                    //TODO can i use a template for this ugly monster?
                    var newImage = angular.element('<img alt="" index="' + newIndex + '" src="' + scope.data.images[newIndex].imageSrc + '" class="lb-image lb-image-active lb-image-enter-right" ng-click="lbNextImage()" no-propagation preloadable lb-calc-dimensions/>');
                    backdrop.append($compile(newImage)(scope));
                    //watch for image getting loaded, then animate it
                    scope.$watch(function(){return newImage.attr('loaded'); }, function(newValue){
                        if(newValue === 'true'){
                            oldImage.velocity({
                                opacity: 0,
                                width: '0px',
                                left: '0px',
                                bottom: '200%'
                            },{
                                duration: 300,
                                complete: function(){
                                    oldImage.remove();
                                }
                            });
                            newImage.velocity({
                                left: '0'
                            },{
                                duration: 150,
                                delay: 150
                            });
                        }
                    });
                };
            }
        };
    });