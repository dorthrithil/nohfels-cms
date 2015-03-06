'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsClientApp.directive:alert
 * @description
 * # alert
 */
angular.module('amnohfelsClientApp')
    .directive('alert', function ($sce, animator) {
        return {
            templateUrl: 'views/alert.html',
            restrict: 'E',
            scope: {
                type: '='
            },
            link: {
                pre: function (scope, element) {
                    var alertCurrentlyVisible = false;

                    var submitPressed = function(){
                        alertCurrentlyVisible = true;
                        scope.toggleAlert();
                    };

                    scope.dismissAlert = function(){
                        alertCurrentlyVisible = false;
                        scope.hideAlert();
                    };

                    scope.hideAlert = function () {
                        if (element.css('display') !== 'none') {
                            animator.shrinkHeightTo(element, '0px');
                        }
                    };
                    scope.showAlert = function () {
                        animator.expandHeightTo(element, element.attr('actual-height'));
                    };
                    scope.toggleAlert = function () {
                        if(alertCurrentlyVisible) {
                            switch (scope.type) {
                                case 'emailInvalid':
                                    if (scope.$parent.contactForm.emailInput.$error.pattern) {
                                        scope.showAlert();
                                    } else {
                                        scope.hideAlert();
                                    }
                                    break;
                                case 'emailRequired':
                                    if (scope.$parent.contactForm.emailInput.$error.required) {
                                        scope.showAlert();
                                    } else {
                                        scope.hideAlert();
                                    }
                                    break;
                                case 'nameRequired':
                                    if (scope.$parent.contactForm.nameInput.$error.required) {
                                        scope.showAlert();
                                    } else {
                                        scope.hideAlert();
                                    }
                                    break;
                                case 'messageRequired':
                                    if (scope.$parent.contactForm.messageInput.$error.required) {
                                        scope.showAlert();
                                    } else {
                                        scope.hideAlert();
                                    }
                                    break;
                                default:
                                    break;
                            }
                        }
                    };
                    scope.$on('contactFormSubmitted', submitPressed); //bind to form submit event

                    scope.$on('validate-form', scope.toggleAlert); //bind to form submit event
                }
            },
            controller: function ($scope) {
                switch ($scope.type) {
                    case 'emailInvalid':
                        $scope.priority = 'alert-danger';
                        $scope.text = $sce.trustAsHtml('<strong>E-Mail Adresse ungültig:</strong> Fehlt eventuell das @-Symbol?');
                        break;
                    case 'emailRequired':
                        $scope.priority = 'alert-warning';
                        $scope.text = $sce.trustAsHtml('<strong>Pflichtfeld:</strong> Bitte geben Sie Ihre E-Mail Adresse an!');
                        break;
                    case 'nameRequired':
                        $scope.priority = 'alert-warning';
                        $scope.text = $sce.trustAsHtml('<strong>Pflichtfeld:</strong> Bitte geben Sie Ihren Namen an!');
                        break;
                    case 'messageRequired':
                        $scope.priority = 'alert-warning';
                        $scope.text = $sce.trustAsHtml('<strong>Pflichtfeld:</strong> Bitte geben Sie eine Nachricht ein Sie scheiß Penner! Wie dumm kann man denn sein, ne Nachricht absenden wollen und dann die eigentliche Nachricht vergessen, eh, ich checks nicht...');
                        break;
                    default:
                        break;
                }
            }
        };
    });
