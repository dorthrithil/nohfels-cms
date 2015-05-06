'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsBackendApp.directive:popover
 * @description
 * # popover
 */
angular.module('amnohfelsBackendApp')
    .directive('popover', function () {
        return {
            templateUrl: 'views/popover.html',
            restrict: 'E',
            scope: {
                data: '='
            },
            link: function postLink(scope, element) {
                element.children().popover({
                    title: scope.data.title,
                    content: scope.data.content
                });
            }
        };
    });
