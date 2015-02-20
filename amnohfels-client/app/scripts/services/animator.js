'use strict';

/**
 * @ngdoc service
 * @name amnohfelsClientApp.animator
 * @description
 * # animator
 * Service in the amnohfelsClientApp.
 */

//TODO allow staggered animations to get rid of delay arguments
//TODO fly out animations better

angular.module('amnohfelsClientApp')
  .service('animator', function animator($q) {

    var animationStepDuration = 200;

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

    this.slideInFromRight = function($element, delay){
        delay = delay || 0;
        $element.velocity({
            left: '0'
        }, {
            duration: animationStepDuration,
            delay: delay
        });
    };

    this.slideInFromLeft = function($element, delay){
        delay = delay || 0;
        $element.velocity({
            right: '0'
        }, {
            duration: animationStepDuration,
            delay: delay
        });
    };

    this.flyOutLeft = function($element) {
        return $q(function(resolve) {
            $element.velocity({
                opacity: 0,
                width: '0px',
                height: '0px',
                right: '100%',
                bottom: '100%'
            }, {
                duration: animationStepDuration * 2,
                complete: function () {
                    $element.remove();
                    resolve();
                }
            });
        });
    };

    this.flyOutRight = function($element) {
        return $q(function(resolve) {
            $element.velocity({
                opacity: 0,
                width: '0px',
                height: '0px',
                left: '100%',
                bottom: '100%'
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