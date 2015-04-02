'use strict';

/**
 * @ngdoc function
 * @name amnohfelsBackendApp.controller:NavigationCtrl
 * @description
 * # NavigationCtrl
 * Controller of the amnohfelsBackendApp
 */
angular.module('amnohfelsBackendApp')
    .controller('NavigationCtrl', function ($scope, $location) {
        $scope.isOnPath = function (path) {
            return path === $location.path();
        };
    });

