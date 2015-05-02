'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsBackendApp.directive:contentPane
 * @description
 * # contentPane
 * parent element for all content. is set transparent when user is logged out
 */

angular.module('amnohfelsBackendApp')
    .directive('contentPane', function (doorman) {
        return {
            template: '<div ng-view autoscroll="true" class="container" ng-class="{\'solid-pane\' : isLoggedIn()}"></div>',
            restrict: 'E',
            link: function postLink(scope) {
                scope.isLoggedIn = function () {
                    return doorman.isLoggedIn();
                };
            }
        };
    });
