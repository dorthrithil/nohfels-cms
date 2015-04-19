'use strict';

/**
 * @ngdoc function
 * @name amnohfelsBackendApp.controller:NavigationCtrl
 * @description
 * # NavigationCtrl
 * Controller of the amnohfelsBackendApp
 */
angular.module('amnohfelsBackendApp')
    .controller('NavigationCtrl', function ($scope, $location, phpServerRoot, $http) {
        $scope.isOnPath = function (path) {
            return path === $location.path();
        };
        $scope.topics = [];
        $http.get(phpServerRoot + '/api/topic')
            .success(function (response) {
                $scope.topics = response;
            });
    });

