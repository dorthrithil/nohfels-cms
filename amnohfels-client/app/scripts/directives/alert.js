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
                    var toggle = function () {
                        switch (scope.type) {
                            case 'emailInvalid':
                                if (!scope.$parent.contactForm.emailInput.$error.required && !scope.$parent.contactForm.emailInput.$valid) {
                                    animator.expandHeightTo(element, element.attr('actual-height'));
                                } else if (element.css('display') !== 'none') {
                                    animator.shrinkHeightTo(element, '0px');
                                }
                                break;
                            case 'emailRequired':
                                if (scope.$parent.contactForm.emailInput.$error.required) {
                                    animator.expandHeightTo(element, element.attr('actual-height'));
                                } else if (element.css('display') !== 'none') {
                                    animator.shrinkHeightTo(element, '0px');
                                }
                                break;
                            case 'nameRequired':
                                if (scope.$parent.contactForm.nameInput.$error.required) {
                                    animator.expandHeightTo(element, element.attr('actual-height'));
                                } else if (element.css('display') !== 'none') {
                                    animator.shrinkHeightTo(element, '0px');
                                }
                                break;
                            case 'messageRequired':
                                if (scope.$parent.contactForm.messageInput.$error.required) {
                                    animator.expandHeightTo(element, element.attr('actual-height'));
                                } else if (element.css('display') !== 'none') {
                                    animator.shrinkHeightTo(element, '0px');
                                }
                                break;
                            default:
                                break;
                        }
                    };
                    scope.$on('contactFormSubmitted', toggle);
                }
            },
            controller: function ($scope) {
                $scope.test = 42;
                $scope.actualHeight = 0;
                switch ($scope.type) {
                    case 'emailInvalid':
                        $scope.priority = 'alert-danger';
                        $scope.text = $sce.trustAsHtml('<strong>E-Mail Adresse ungültig:</strong> Fehlt eventuell das @-Symbol?');
                        break;
                    case 'emailRequired':
                        $scope.priority = 'alert-warning';
                        $scope.text = $sce.trustAsHtml('Bitte geben Sie eine E-Mail Adresse an!');
                        break;
                    case 'nameRequired':
                        $scope.priority = 'alert-warning';
                        $scope.text = $sce.trustAsHtml('Bitte geben Sie Ihren Namen an!');
                        break;
                    case 'messageRequired':
                        $scope.priority = 'alert-warning';
                        $scope.text = $sce.trustAsHtml('Bitte geben Sie eine Nachricht ein Sie scheiß Penner! Wie dumm kann man denn sein, ne Nachricht absenden wollen und dann die eigentliche Nachricht vergessen, eh, ich checks nicht...');
                        break;
                    default:
                        break;
                }
            }
        };
    });
