'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsClientApp.directive:staffModule
 * @description
 * # staffModule
 */
angular.module('amnohfelsClientApp')
  .directive('staffModule', function (phpServerRoot) {
    return {
        templateUrl: 'views/staff-module.html',
        restrict: 'E',
        scope: {
            data: '='
        },
        controller: function($scope){
            $scope.phpServerRoot = phpServerRoot; //for wiring up image src
        }
    };
  });
