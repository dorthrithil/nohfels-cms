'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsClientApp.directive:contactModule
 * @description
 * # contactModule
 */
angular.module('amnohfelsClientApp')
    .directive('contactModule', function ($timeout, util, $http, phpServerRoot) {
        return {
            templateUrl: 'views/contact-module.html',
            restrict: 'E',
            scope: {
                data: '='
            },
            link: {
                pre: function (scope) {
                    var keyupTriggerActivated = false;
                    scope.activateKeyupTrigger = function () {
                        keyupTriggerActivated = true;
                    };
                    scope.keyupTrigger = function ($event, errorCondition, validCondition) {
                        if (keyupTriggerActivated) {
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

                    scope.indicate = function ($element, errorCondition, validCondition) {
                        scope.$broadcast('validate-form'); //toggles already active alerts
                        if (errorCondition.pattern) {
                            scope.indicateError($element);
                        } else if (errorCondition.required) {
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

                    scope.submit = function ($event) {
                        scope.$broadcast('contactFormSubmitted'); //toggles all alerts
                        //TODO find a way to trigger all indicates with a function
                        if (scope.contactForm.$valid) { //send form to server if form is valid
                            scope.transferForm($event);
                        }
                    };
                }
            },
            controller: function ($scope) {

                $scope.formData = {
                    name: '',
                    email: '',
                    message: ''
                };

                $scope.resetContent = {
                    title: 'Nachricht gesendet',
                    text: 'Vielen Dank für Ihre Nachricht. Wir werden Ihnen schnellst möglich antworten.'
                };
                $scope.badRequest = {
                    title: 'Anfrage fehlerhaft',
                    text: 'Die Nachricht konnte nicht gesendet werden, da der Server eine fehlerhafte Anfrage meldet. Bitte versuchen Sie es erneut.'
                };
                $scope.requestTimeout = {
                    title: 'Zeitüberschreitung',
                    text: 'Die Nachricht konnte nicht gesendet werden, da der Server eine Zeitüberschreitung meldet. Bitte versuchen Sie es erneut.'
                };
                $scope.internalServerError = {
                    title: 'Interner Server Fehler',
                    text: 'Die Nachricht konnte nicht gesendet werden, da ein interner Server Fehler aufgetreten ist. Bitte versuchen Sie es erneut.'
                };

                $scope.transferForm = function ($event) {

                    $scope.event = $event;

                    var modal = angular.element($event.target).next().children();

                    $http({
                        method: 'POST',
                        url: phpServerRoot + '?site=contactModule',
                        data: $.param($scope.formData),
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    })
                        .success(function (data, status) {
                            if(status === 205){
                                $scope.modal = $scope.resetContent;
                                $scope.formData = {
                                    name: '',
                                    email: '',
                                    message: ''
                                };
                                //TODO find a way to trigger all indicates with a function
                            }
                            $scope.modal.status = 'success';
                            modal.modal();
                        })
                        .error(function (data, status) {
                            if(status === 400){
                                $scope.modal = $scope.badRequest;
                            }
                            if(status === 408){
                                $scope.modal = $scope.requestTimeout;
                            }
                            if(status === 500){
                                $scope.modal = $scope.internalServerError;
                            }
                            $scope.modal.status = 'error';
                            modal.modal();
                        });
                };

                $scope.resend = function($event){
                    var modal = angular.element($event.target).next().children();
                    modal.modal('hide');
                    modal.on('hidden.bs.modal', function () {
                        modal.unbind('hidden.bs.modal');
                        $scope.transferForm($event);
                    });
                };
            }
        };
    });
