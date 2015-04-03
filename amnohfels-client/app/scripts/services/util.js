'use strict';

/**
 * @ngdoc service
 * @name amnohfelsClientApp.util
 * @description
 * # util
 * Service in the amnohfelsClientApp.
 */
angular.module('amnohfelsClientApp')
    .service('util', function util($timeout, phpServerRoot, $http) {
        var lockedUntil;
        this.throttle = function (fn, threshhold) {
            if (!threshhold) {
                threshhold = 250;
            }
            var now = +new Date();
            if (lockedUntil && now > lockedUntil) {
                fn.apply(this);
                lockedUntil = now + threshhold;
            } else if (!lockedUntil) {
                fn.apply(this);
                lockedUntil = now + threshhold;
            }

//            if (last && now < last + threshhold) {
//                $timeout.cancel(deferTimer);
//                deferTimer = $timeout(function () {
//                    last = now;
//                    fn.apply(this);
//                    e++;
//                }, threshhold);
//            } else {
//                last = now;
//                fn.apply(this);
//                e++;
//            }
            //console.log(c);
            //console.log(e);
            //TODO throttle function doesn't work correct
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

        /**
         * @arguments:
         *  $element: angular element
         *
         * @returns:
         *  true: if $element is in viewport
         *  false: if not
         */
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

        /**
         * @arguments:
         *  s: string
         *
         * @returns:
         *  s without #hashtags
         */
        this.filterOutHashTags = function (s) { //TODO (1.0.1) improvement: rewrite this as an angular filter
            var res = '', hashTagDetected = false;
            for (var i = 0; i < s.length; i++) {
                if (s.charAt(i) === '#' && !hashTagDetected) {
                    hashTagDetected = true;
                } else if (!hashTagDetected) {
                    res += s.charAt(i);
                }
                if (hashTagDetected && s.charAt(i) === ' ') {
                    hashTagDetected = false;
                }
            }
            return res;
        };

        /**
         * @arguments:
         *  topic: the pages topic
         *  $scope: the $scope from where the function is called (the page will be compiled on this scope)
         *
         * @description:
         *  gets page data from server and invokes scaffold-modules page compilation
         */
        this.compilePage = function (topic, $scope) {
            var page = '/index.php?q=page&topic=' + topic;
            $http.get(phpServerRoot + page)
                .success(function (response) {
                    $scope.response = response;
                    $scope.$broadcast('compile-modules'); //TODO (1.0.1) improvement: as this is the same page, i could use a function instead of events?
                });
        };

        /**
         * @arguments:
         *  h: a css height value
         *
         * @description:
         *  returns the pixel converted vh height excluding the navigation bar
         */
        this.convertVh = function (h) {
            if (h.charAt(h.length - 2) === 'v' && h.charAt(h.length - 1) === 'h') {
                var numeral = h.substring(0, h.length - 2);
                var navBarHeight = angular.element.find('nav')[0].offsetHeight;
                return (numeral / 100) * window.innerHeight - navBarHeight + 'px';
            } else {
                return h;
            }
        };

    });
