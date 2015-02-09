'use strict';

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