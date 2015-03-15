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
        this.throttle = function (fn, threshhold, throttleScope) {
            if (!threshhold) {
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
        //works in my case as i have the blur function. but using promises would be better here
        var debouncedFunctionNotExecutedYet = false,
            debouncedFunction = null;

        this.debounce = function (fn, delay) {
            if (debouncedFunctionNotExecutedYet) {
                $timeout.cancel(debouncedFunction);
            }
            debouncedFunction = $timeout(function () {
                fn.apply(this);
                debouncedFunctionNotExecutedYet = false;
            }, delay);
            debouncedFunctionNotExecutedYet = true;
        };

        this.inViewport = function ($element) {
            var bounds = $element.get(0).getBoundingClientRect();
            return bounds.top < window.innerHeight && bounds.bottom > 0;
        };

        /**
         * @arguments:
         *  a: array
         *  b: object or an array of objects
         *
         * @returns:
         *  true: if b or an element in b is in array a
         *  false: if not
         */

        this.inArray = function (a, b) {
            b = [].concat(b); //not efficient
            for (var i = 0; i < a.length; i++) {
                for (var j = 0; j < b.length; j++) {
                    if (a[i] === b[j]) {
                        return true;
                    }
                }
            }
            return false;
        };

        this.filterOutHashTags = function (s) { //TODO rewrite this as an angular filter
            var res = '', hashTagDetected = false;
            for (var i = 0; i < s.length; i++) {
                if(s.charAt(i) === '#' && !hashTagDetected){
                    hashTagDetected = true;
                } else if(!hashTagDetected ){
                    res += s.charAt(i);
                }
                if(hashTagDetected && s.charAt(i) === ' '){
                    hashTagDetected = false;
                }
            }
            return res;
        };

    });
