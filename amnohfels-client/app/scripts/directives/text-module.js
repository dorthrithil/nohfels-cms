'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsClientApp.directive:textModule
 * @description
 * # textModule
 */
angular.module('amnohfelsClientApp')
  .directive('textModule', function () {
    return {
        templateUrl: 'views/text-module.html',
        restrict: 'E',
        scope: {
            data: '='
        },
        controller: function($scope, $sce){
            $scope.data.title = $sce.trustAsHtml($scope.data.title);
            $scope.data.content = $sce.trustAsHtml($scope.data.content);
        }
    };
  });
