'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsClientApp.directive:noPropagation
 * @description
 * # noPropagation
 * Stops click event propagation on element
 */

angular.module('amnohfelsClientApp')
    .directive('noPropagation', function () {
        return {
            restrict: 'A',
            link: function (scope, element) {
                element.bind('click', function (e) {
                    e.stopPropagation();
                });
            }
        };
    });