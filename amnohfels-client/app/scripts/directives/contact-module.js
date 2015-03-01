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
                    scope.keydownTrigger = function ($event, errorCondition, validCondition) {
                        var $element = angular.element($event.target);
                        scope.deIndicate($element);
                        util.debounce(function () {
                            scope.indicate($element, errorCondition, validCondition);
                        }, 1000);
                    };

                    scope.blurTrigger = function ($event, errorCondition, validCondition) {
                        var $element = angular.element($event.target);
                        scope.indicate($element, errorCondition, validCondition);
                    };

                    scope.indicate = function($element, errorCondition, validCondition){
                        if (errorCondition) {
                            scope.deIndicate($element);
                            scope.indicateError($element);
                        }
                        if (validCondition) {
                            scope.deIndicate($element);
                            scope.indicateSuccess($element);
                        }
                    };

                    scope.indicateError = function ($element) {
                        $element.parent().addClass('has-error');
                        $element.next().addClass('glyphicon-remove');
                    };
                    scope.indicateSuccess = function ($element) {
                        $element.parent().addClass('has-success');
                        $element.next().addClass('glyphicon-ok');
                    };
                    scope.deIndicate = function ($element) {
                        $element.parent().removeClass('has-error has-success');
                        $element.next().removeClass('glyphicon-remove glyphicon-ok');
                    };
                }
            },
            controller: function ($scope) {
                $scope.email = {
                    displayError: false,
                    text: 'tests'
                };
            }
        };
    });
