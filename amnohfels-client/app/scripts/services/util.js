'use strict';

/**
 * @ngdoc service
 * @name amnohfelsClientApp.util
 * @description
 * # util
 * Service in the amnohfelsClientApp.
 */
angular.module('amnohfelsClientApp')
  .service('util', function util() {
    this.throttle =  function(fn, threshhold, throttleScope) {
        if(!threshhold){
            threshhold = 250;
        }
        var last,
            deferTimer;
        return function () {
            var context = throttleScope || this;
            var now = +new Date(),
                args = arguments;
            if (last && now < last + threshhold) {
                clearTimeout(deferTimer);
                deferTimer = setTimeout(function () {
                    last = now;
                    fn.apply(context, args);
                }, threshhold);
            } else {
                last = now;
                fn.apply(context, args);
            }
        };
    };

    this.inViewport = function($element){
        var bounds = $element.get(0).getBoundingClientRect();
        return bounds.top < window.innerHeight && bounds.bottom > 0;
    };
  });
