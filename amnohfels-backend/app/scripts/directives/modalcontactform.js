'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsBackendApp.directive:modalContactForm
 * @description
 * # modalContactForm
 */

angular.module('amnohfelsBackendApp')
    .directive('modalContactForm', function () {
        return {
            templateUrl: 'views/modalcontactform.html',
            restrict: 'E',
            controller: function ($scope) {
                if ($scope.modalVars.action === 'create') {
                    $scope.modalVars.data.title = '';
                    $scope.modalVars.data.topic = '';
                }
                $scope.modalVars.route = '/contact';
                $scope.modalVars.data.pageTopic = $scope.pageTopic;

                //data for popovers
                $scope.popovers = {
                    topic : {
                        title: 'Was ist das?',
                        content: '"Thema" wird im Betreff der Mails stehen, die über das Kontaktformular verschickt werden. So kannst du die Mails direkt zuordnen.'
                    }
                };
            }
        };
    });
