'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsClientApp.directive:staffModule
 * @description
 * # staffModule
 */

//TODO (1.0.0) UI: layout gets messed up by different height cells. => resize service where you can register functions
// which will be executed on window resize. directive for rows which sets proper heights and registers there

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
