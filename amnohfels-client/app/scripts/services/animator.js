'use strict';

/**
 * @ngdoc service
 * @name amnohfelsClientApp.animator
 * @description
 * # animator
 * Service in the amnohfelsClientApp.
 */

//TODO allow staggered animations to get rid of delay arguments

angular.module('amnohfelsClientApp')
  .service('animator', function animator($q, $window) {

    var animationStepDuration = 200;

    //TODO pass an object and call the animations with a delay
    this.stagger = function(animations){
        angular.forEach(animations, function(animation) {
            animation[0](animation[1]);
        });
//        angular.forEach(animations, function(animation) {
//            animation.call();
//        });
    };

    this.fadeIn = function($element, delay){
        delay = delay || 0;
        $element.velocity({
            opacity: 1
        },{
            duration: animationStepDuration,
            delay: delay,
            easing: 'easeInSine'
        });
    };

    this.fadeOutAndRemove = function($element, delay){
        delay = delay || 0;
        $element.velocity({
            opacity: 0
        },{
            duration: animationStepDuration,
            delay: delay,
            easing: 'easeInSine',
            complete: function(){
                $element.remove();
            }
        });
    };

    this.slideInRight = function($element, delay){
        delay = delay || 0;
        return $q(function(resolve) {
            $element.css({
                right : '0px',
                left : $window.innerWidth - parseInt($element.css('width')) + 'px'
            });
            $element.velocity({
                right : '0',
                left: '0',
                opacity: '1'
            }, {
                duration: animationStepDuration,
                delay: delay,
                complete: function () {
                    resolve();
                }
            });
        });
    };

    this.slideInLeft = function($element, delay){
        delay = delay || 0;
        return $q(function(resolve) {
            $element.css({
                left : '0px',
                right : $window.innerWidth - parseInt($element.css('width')) + 'px'
            });
            $element.velocity({
                right: '0',
                left: '0',
                opacity: '1'
            }, {
                duration: animationStepDuration,
                delay: delay,
                complete: function () {
                    resolve();
                }
            });
        });
    };

    this.slideOutLeft = function($element) {
        return $q(function(resolve) {
            $element.velocity({
                opacity: 0,
                left: '0px',
                right: $window.innerWidth - parseInt($element.css('width')) + 'px'
            }, {
                duration: animationStepDuration * 2,
                complete: function () {
                    $element.remove();
                    resolve();
                }
            });
        });
    };

    this.slideOutRight = function($element) {
        return $q(function(resolve) {
            $element.velocity({
                opacity: 0,
                right: '0px',
                left: $window.innerWidth - parseInt($element.css('width')) + 'px'
            }, {
                duration: animationStepDuration * 2,
                complete: function () {
                    $element.remove();
                    resolve();
                }
            });
        });
    };

  });