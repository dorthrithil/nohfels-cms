'use strict';

/**
 * @ngdoc service
 * @name amnohfelsClientApp.animator
 * @description
 * # animator
 * Service in the amnohfelsClientApp.
 */

//TODO what happens with unstaggered animations called between staggered animations? (not important for the current usecase)
//i can use a real queue for that. use array.push() to build up the queue in image-module
//and use something like queue.start to start the animation which iterates with array.shift()
//the problem would be solved then because i could bring the delay in exclusively this way. also it's way cleaner.
//TODO comment stagger, animation, deStagger

angular.module('amnohfelsClientApp')
    .service('animator', function animator($q, $window) {

        var animationStepDuration = 200;

        var staggerCount = -1; //counts the elements that will be staggered
        var deStaggerCount = -1; //counts the finished elements that have been staggered

        //adds an element to the staggerCounter. must be followed by an animation call
        this.stagger = function () {
            staggerCount++; //
            return this; //for function chaining
        };

        //deletes element from the staggerCounter
        function deStagger() {
            if (staggerCount >= 0) {
                deStaggerCount++;
            }
            if (deStaggerCount === staggerCount) { //resets both counters if all animations are finished
                staggerCount = -1;
                deStaggerCount = -1;
            }
        }

        //takes an angular/dom element and an object of css properties which will get animated
        //takes an optional argument object which can contain:
        //  concreteSettings: an object of velocity settings
        //  preFormatting: an object of css properties which get applied before the animation
        function animation($element, properties, args) {
            if (typeof args.concreteSettings === 'undefined'){
                args.concreteSettings = {}; //concrete settings can't be undefined because we need to assign defaults
            }
            if (typeof args.concreteSettings.delay === 'undefined') {
                angular.extend(args.concreteSettings, {delay: 0});
            } else if (typeof args.concreteSettings.delay === 'undefined') { //if the concrete animation isn't passed a delay
                args.concreteSettings.delay = 0;
            }
            if (typeof args.concreteSettings.duration === 'undefined') {
                angular.extend(args.concreteSettings, {duration: animationStepDuration});
            }
            if (staggerCount !== 0) { //if it's a staggered animation, we have to wait some time
                args.concreteSettings.delay += staggerCount * animationStepDuration;
            }
            return $q(function (resolve) { //return a promise for callbacks
                if (typeof args.preFormatting !== 'undefined') { //apply preFormatting
                    $element.css(args.preFormatting);
                }
                var abstractSettings = { //complete actions
                    complete: function () {
                        resolve(); //resolve promise
                        deStagger();
                    }
                };
                $element.velocity(properties, angular.extend(abstractSettings, args.concreteSettings)); //animate
            });
        }

        this.fadeOut = function ($element, delay) {
            var args = {
                concreteSettings: {
                    delay: delay,
                    easing: 'easeInSine'
                }
            };
            var properties = {
                opacity: '0'
            };
            return animation($element, properties, args);
        };

        this.slideInRight = function ($element, delay) {
            var properties = {
                right: '0',
                left: '0',
                opacity: '1'
            };
            var args = {
                preFormatting: {
                    right: '0px',
                    left: $window.innerWidth - parseInt($element.css('width')) + 'px'
                },
                concreteSettings: {
                    delay: delay
                }
            };
            return animation($element, properties, args);
        };

        this.fadeIn = function ($element, delay) {
            var properties = {
                opacity: 1
            };
            var args = {
                concreteSettings: {
                    delay: delay,
                    easing: 'easeInSine'
                }
            };
            return animation($element, properties, args);
        };

        this.slideInLeft = function ($element, delay) {
            var properties = {
                right: '0',
                left: '0',
                opacity: '1'
            };
            var args = {
                preFormatting: {
                    left: '0px',
                    right: $window.innerWidth - parseInt($element.css('width')) + 'px'
                },
                concreteSettings: {
                    delay: delay
                }
            };
            return animation($element, properties, args);
        };

        this.slideOutLeft = function ($element, delay) {
            var properties = {
                opacity: 0,
                left: '0px',
                right: $window.innerWidth - parseInt($element.css('width')) + 'px'
            };
            var args = {
                concreteSettings: {
                    duration: animationStepDuration * 2,
                    delay: delay
                }
            };
            return animation($element, properties, args);
        };

        this.slideOutRight = function ($element, delay) {
            var properties = {
                opacity: 0,
                right: '0px',
                left: $window.innerWidth - parseInt($element.css('width')) + 'px'
            };
            var args = {
                concreteSettings: {
                    duration: animationStepDuration * 2,
                    delay: delay
                }
            };
            return animation($element, properties, args);
        };

    });