'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsClientApp.directive:contactModule
 * @description
 * # contactModule
 */
angular.module('amnohfelsClientApp')
    .directive('contactModule', function ($timeout, util) {
        return {
            templateUrl: 'views/contact-module.html',
            restrict: 'E',
            scope: {
                data: '='
            },
            link: {
                pre: function (scope) {
                    var keyupTriggerActivated = false;
                    scope.activateKeyupTrigger = function(){
                        console.log('keypress');
                        keyupTriggerActivated = true;
                    };
                    scope.keyupTrigger = function ($event, errorCondition, validCondition) {
                        console.log('keyup');
                        if(keyupTriggerActivated){
                            keyupTriggerActivated = false;
                            var $element = angular.element($event.target);
                            scope.deIndicate($element);
                            util.debounce(function () {
                                scope.indicate($element, errorCondition, validCondition);
                            }, 1000);
                        }
                    };

                    scope.blurTrigger = function ($event, errorCondition, validCondition) {
                        keyupTriggerActivated = false;
                        var $element = angular.element($event.target);
                        scope.indicate($element, errorCondition, validCondition);
                    };

                    scope.indicate = function($element, errorCondition, validCondition){
                        scope.$broadcast('validate-form');
                        if (errorCondition.pattern) {
                            scope.indicateError($element);
                        } else if (errorCondition.required){
                            scope.indicateWarning($element);
                        }
                        if (validCondition) {
                            scope.indicateSuccess($element);
                        }
                    };

                    scope.indicateWarning = function ($element) {
                        scope.deIndicate($element);
                        $element.parent().addClass('has-warning');
                        $element.next().addClass('glyphicon-warning-sign');
                    };
                    scope.indicateError = function ($element) {
                        scope.deIndicate($element);
                        $element.parent().addClass('has-error');
                        $element.next().addClass('glyphicon-remove');
                    };
                    scope.indicateSuccess = function ($element) {
                        scope.deIndicate($element);
                        $element.parent().addClass('has-success');
                        $element.next().addClass('glyphicon-ok');
                    };
                    scope.deIndicate = function ($element) {
                        $element.parent().removeClass('has-error has-success has-warning');
                        $element.next().removeClass('glyphicon-remove glyphicon-ok glyphicon-warning-sign');
                    };

                    scope.submit = function(){
                        scope.$broadcast('contactFormSubmitted');
                    };
                }
            },
            controller: function ($scope) {
                $scope.name = {
                    text: ''
                };
                $scope.email = {
                    text: ''
                };
                $scope.message = {
                    text: ''
                };
            }
        };
    });
