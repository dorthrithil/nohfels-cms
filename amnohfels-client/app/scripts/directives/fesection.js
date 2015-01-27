'use strict';

angular.module('amnohfelsClientApp')
    .directive('feSection', function () {
        return {
            templateUrl: 'views/fesection.html',
            restrict: 'E',
            scope: {
                data: '='
            }
        };
    });
