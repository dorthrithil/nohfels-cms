'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsClientApp.directive:textModule
 * @description
 * # textModule
 */
angular.module('amnohfelsClientApp')
    .directive('textModule', function ($sce, config) {
        return {
            templateUrl: 'views/text-module.html',
            restrict: 'E',
            scope: {
                data: '='
            },
            controller: function ($scope) {
                $scope.data.title = $sce.trustAsHtml($scope.data.title);
                //link uploaded files to server toot
                $scope.data.content = $scope.data.content.replace(new RegExp('uploads/files/', 'g'), config.server.root + 'uploads/files/');
                $scope.data.content = $sce.trustAsHtml($scope.data.content);

            }
        };
    });
