'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsClientApp.directive:alert
 * @description
 * # alert
 */

//TODO (1.0.0) bug: indication doesn't change from email invalid to email required on deleting the whole input value

angular.module('amnohfelsClientApp')
    .directive('alert', function ($sce, animator, $timeout) {
        return {
            templateUrl: 'views/alert.html',
            restrict: 'E',
            scope: {
                type: '='
            },
            link: {
                pre: function (scope, element) {
                    var alertCurrentlyVisible = false;

                    //reacts to form successfully submitted event
                    var resetAllAlerts = function(){
                        alertCurrentlyVisible = false;
                    };
                    scope.$on('resetAllAlerts', resetAllAlerts);

                    //reacts to form submit event
                    var toggleAllAlerts = function(){
                        alertCurrentlyVisible = true;
                        scope.toggleAlert();
                    };
                    scope.$on('toggleAllAlerts', toggleAllAlerts);

                    //hides the alert on alert-close-button click
                    scope.dismissAlert = function(){
                        alertCurrentlyVisible = false; //it won't be triggered again when model error/valid-state changes
                        scope.hideAlert();
                    };

                    //hides this specific alert
                    scope.hideAlert = function () {
                        if (element.css('display') !== 'none') {
                            animator.shrinkHeightTo(element, '0px');
                        }
                    };

                    //shows this specific alert
                    scope.showAlert = function () {
                        animator.expandHeightTo(element, element.attr('actual-height'));
                    };

                    //toggles alert depending on actual error/valid-state
                    scope.toggleAlert = function () {
                        $timeout(function(){
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
                        });
                    };
                    scope.$on('toggleActiveAlerts', scope.toggleAlert); //reacts to form submit event
                }
            },
            controller: function ($scope) {
                //alert text and type depending on type argument
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
                        $scope.text = $sce.trustAsHtml('<strong>Pflichtfeld:</strong> Bitte geben Sie eine Nachricht ein!');
                        break;
                    default:
                        break;
                }
            }
        };
    });
