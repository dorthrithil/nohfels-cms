'use strict';

/**
 * @ngdoc service
 * @name amnohfelsClientApp.util
 * @description
 * # util
 * Service in the amnohfelsClientApp.
 */
angular.module('amnohfelsClientApp')
  .service('util', function util($timeout) {
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

    //TODO comment + what happens when the scope of the function changes? will the old function be executed? (e.g. when i tab into another input and start tying there)
    var debouncedFunctionNotExecutedYet = false,
        debouncedFunction = null;

    this.debounce = function(fn, delay){
        if (debouncedFunctionNotExecutedYet) {
            $timeout.cancel(debouncedFunction);
        }
        debouncedFunction = $timeout(function () {
            fn.apply(this);
            debouncedFunctionNotExecutedYet = false;
        }, delay);
        debouncedFunctionNotExecutedYet = true;
    };

    this.inViewport = function($element){
        var bounds = $element.get(0).getBoundingClientRect();
        return bounds.top < window.innerHeight && bounds.bottom > 0;
    };
  });
