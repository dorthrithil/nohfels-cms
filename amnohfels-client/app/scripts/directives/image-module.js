'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsClientApp.directive:imageModule
 * @description
 * # imageModule
 */

//TODO (1.0.0) bug: fix display on small devices

//TODO (1.0.1) enhancement: add caption functionality to gallery
//TODO (1.0.1) enhancement: put lightbox code into a lightbox service
//TODO (1.0.1) refactoring: templates for spaghetti angular element definitions

angular.module('amnohfelsClientApp')
  .directive('imageModule', function ($compile, animator, $document, $timeout, config) {
    return {
      templateUrl: 'views/image-module.html',
      restrict: 'E',
      scope: {
        data: '='
      },
      link: function (scope) {
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
        var caption = null;
        var changeImageMutex = false; //makes sure only one image gets changed at a time

        scope.getImageSrc = function (index) {
          switch (scope.data.images[index].imageSize) {
            case 'small':
              return 'url(' + config.server.root + scope.data.images[index].imageThumbSquareSrc + ')';
            case 'large':
              return 'url(' + config.server.root + scope.data.images[index].imageSrc + ')';
            default:
              return;
          }
        };

        //appends lightbox to dom with animation
        scope.lbOpen = function (index) {
          image = angular.element('<img alt="" index="' + index + '" src="' + config.server.root + scope.data.images[index].imageSrc + '" ng-click="lbChangeImage(\'right\')" no-propagation lb-calc-dimensions preloadable/>');
          backdrop.append(image);
          caption = angular.element('<div class="caption">' + scope.data.images[index].imageCaption + '</div>');
          backdrop.append(caption);
          body.append($compile(backdrop)(scope)); //compiling is necessary to wire up the used directives
          $document.bind('keyup', lbMapKeyup);
          animator.stagger().fadeIn(backdrop);
          var startLoadingAnimation = true;
          var loadingAnimationStarted = false;
          $timeout(function () { //if loading the image takes long, indicate with spinning glyphicon
            if (startLoadingAnimation) {
              backdrop.append(loadingIcon);
              loadingAnimationStarted = true;
              animator.stagger().fadeIn(loadingIcon);
            }
          }, 500);
          var performAnimation = function () {
            unbindLbImageLoaded();
            startLoadingAnimation = false;
            if (loadingAnimationStarted) { //remove spinning icon
              animator.stagger().fadeOut(loadingIcon).then(function () {
                loadingIcon.remove();
              });
            }
            animator.stagger().fadeIn(image);
            animator.stagger().fadeIn(caption);
          };
          var unbindLbImageLoaded = scope.$on('lbImageLoaded', performAnimation);
        };

        //removes all lightbox from dom with animation
        scope.lbClose = function () {
          animator.stagger().fadeOut(caption);
          animator.stagger().fadeOut(image);
          animator.stagger().fadeOut(backdrop).then(function () {
            backdrop.remove();
          });
          $document.unbind('keyup', lbMapKeyup);
        };

        scope.lbChangeImage = function (direction) {
          if (!changeImageMutex) {
            changeImageMutex = true;
            var index = parseInt(image.attr('index')); //get the actual index
            var newIndex, $icon;
            if (direction === 'right') { //initialize icon and new index
              $icon = nextImageIcon.children().children().children();
              newIndex = (scope.data.images.length - 1 === index) ? 0 : index + 1;
            } else {
              $icon = previousImageIcon.children().children().children();
              newIndex = (index === 0) ? scope.data.images.length - 1 : index - 1;
            }
            var newImage = angular.element('<img alt="" index="' + newIndex + '" src="' + config.server.root + scope.data.images[newIndex].imageSrc + '" ng-click="lbChangeImage(' + direction + ')" no-propagation preloadable lb-calc-dimensions/>');
            backdrop.append($compile(newImage)(scope)); //append new image (outside of viewport)

            var newCaption = angular.element('<div class="caption">' + scope.data.images[newIndex].imageCaption + '</div>');
            backdrop.append($compile(newCaption)(scope));

            var startLoadingAnimation = true;
            var loadingAnimationStarted = false;
            $timeout(function () { //if loading the new image takes long, indicate with spinning glyphicon
              if (startLoadingAnimation) {
                loadingAnimationStarted = true;
                $icon.removeClass('glyphicon-chevron-' + direction).addClass('glyphicon-refresh glyphicon-refresh-animate');
              }
            }, 500);

            var performAnimation = function () {
              unbindLbImageLoaded();
              startLoadingAnimation = false;
              if (loadingAnimationStarted) { //remove spinning icon
                $icon.removeClass('glyphicon-refresh glyphicon-refresh-animate').addClass('glyphicon-chevron-' + direction);
              }
              animator.stagger().fadeOut(caption).then(function(){
                caption.remove();
              });
              if (direction === 'right') { //...animate
                animator.stagger().slideOutLeft(image).then(function () {
                  image.remove();
                });
                animator.stagger().slideInRight(newImage).then(function () {
                  image.remove();
                  image = newImage; //make it reentrantable
                  changeImageMutex = false;
                });
              } else {
                animator.stagger().slideOutRight(image).then(function () {
                  image.remove();
                });
                animator.stagger().slideInLeft(newImage).then(function () {
                  image = newImage;
                  changeImageMutex = false;
                });
              }
              animator.stagger().fadeIn(newCaption).then(function(){
                caption = newCaption;
              });
            };

            var unbindLbImageLoaded = scope.$on('lbImageLoaded', performAnimation);
          }
        };

        var lbMapKeyup = function (keyEvent) {
          //right arrow
          if (keyEvent.which === 39) {
            scope.lbChangeImage('right');
          }
          //left arrow
          if (keyEvent.which === 37) {
            scope.lbChangeImage('left');
          }
          //esc
          if (keyEvent.which === 27) {
            scope.lbClose();
          }
        };
      }
    };
  });
