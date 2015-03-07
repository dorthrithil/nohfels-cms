'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsClientApp.directive:keyPressUp
 * @description
 * # keyPressUp
 */
angular.module('amnohfelsClientApp')
    .directive('keyPressUp', function ($compile, $parse) {
        return {
            restrict: 'A',
            terminal: true,
            priority: 1000,
            link: function link(scope, element, attrs) {
                scope.fn = $parse(attrs['keyPressUp']);
                scope.enabled = false;
                scope.enableKeyPressUp = function(){
                    scope.enabled = true;
                };
                scope.executeKeyPressUp = function($event, error, valid){//TODO how to correctly pass arguments? when i've found out i can use this directive in conctact-module instead of two seperate ones
                    if(scope.enabled){
                        scope.enabled = false;
                        scope.fn(scope, {$event: $event, error: error, valid: valid});
                    }
                };
                element.attr('ng-keypress', 'enableKeyPressUp()');
                element.attr('ng-keyup', 'executeKeyPressUp($event, contactForm.emailInput.$error, contactForm.emailInput.$valid)');
                element.removeAttr('key-press-up');
                $compile(element)(scope);
            }
        };
    });
