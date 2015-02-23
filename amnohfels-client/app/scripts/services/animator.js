'use strict';

/**
 * @ngdoc service
 * @name amnohfelsClientApp.animator
 * @description
 * # animator
 * Service in the amnohfelsClientApp.
 */

//TODO use template pattern
//TODO what happens with unstaggered animations called between staggered animations?

angular.module('amnohfelsClientApp')
  .service('animator', function animator($q, $window) {

    var animationStepDuration = 200;

    var staggerCount = -1;
    var deStaggerCount = -1;

    this.stagger = function(){
        staggerCount++;
        return this;
    };

    function deStagger(){
        if (staggerCount >= 0){
            deStaggerCount++;
        }
        if(deStaggerCount === staggerCount){
            staggerCount = -1;
            deStaggerCount = -1;
        }
    }

    this.fadeIn = function($element, delay){
        delay = delay || 0;
        if(staggerCount !== 0){
            delay += staggerCount * animationStepDuration;
        }
        $element.velocity({
            opacity: 1
        },{
            duration: animationStepDuration,
            delay: delay,
            easing: 'easeInSine',
            complete: function() {
                deStagger();
            }
        });
    };

    this.fadeOutAndRemove = function($element, delay){
        delay = delay || 0;
        if(staggerCount !== 0){
            delay += staggerCount * animationStepDuration;
        }
        $element.velocity({
            opacity: 0
        },{
            duration: animationStepDuration,
            delay: delay,
            easing: 'easeInSine',
            complete: function(){
                deStagger();
                $element.remove();
            }
        });
    };

    this.slideInRight = function($element, delay){
        delay = delay || 0;
        if(staggerCount !== 0){
            delay += staggerCount * animationStepDuration;
        }
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
                    deStagger();
                }
            });
        });
    };

    this.slideInLeft = function($element, delay){
        delay = delay || 0;
        if(staggerCount !== 0){
            delay += staggerCount * animationStepDuration;
        }
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
                    deStagger();
                    resolve();
                }
            });
        });
    };

    this.slideOutLeft = function($element, delay) {
        delay = delay || 0;
        if(staggerCount !== 0){
            delay += staggerCount * animationStepDuration;
        }
        return $q(function(resolve) {
            $element.velocity({
                opacity: 0,
                left: '0px',
                right: $window.innerWidth - parseInt($element.css('width')) + 'px'
            }, {
                delay: delay,
                duration: animationStepDuration * 2,
                complete: function () {
                    $element.remove();
                    deStagger();
                    resolve();
                }
            });
        });
    };

    this.slideOutRight = function($element, delay) {
        delay = delay || 0;
        if(staggerCount !== 0){
            delay += staggerCount * animationStepDuration;
        }
        return $q(function(resolve) {
            $element.velocity({
                opacity: 0,
                right: '0px',
                left: $window.innerWidth - parseInt($element.css('width')) + 'px'
            }, {
                delay: delay,
                duration: animationStepDuration * 2,
                complete: function () {
                    $element.remove();
                    deStagger();
                    resolve();
                }
            });
        });
    };

  });