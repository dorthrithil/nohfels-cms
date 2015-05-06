'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsClientApp.directive:staffModule
 * @description
 * # staffModule
 */
angular.module('amnohfelsClientApp')
  .directive('staffModule', function (config) {
    return {
        templateUrl: 'views/staff-module.html',
        restrict: 'E',
        scope: {
            data: '='
        },
        controller: function($scope){
            $scope.serverRoot = config.server.root; //for wiring up image src
        }
    };
  });
