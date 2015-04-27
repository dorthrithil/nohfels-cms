'use strict';

/**
 * @ngdoc function
 * @name amnohfelsBackendApp.controller:NavigationCtrl
 * @description
 * # NavigationCtrl
 * Controller of the amnohfelsBackendApp
 */
angular.module('amnohfelsBackendApp')
    .controller('NavigationCtrl', function ($scope, $location, phpServerRoot, $http, doorman) {
        $scope.isOnPath = function (path) {
            return path === $location.path();
        };
        //only show navigation to logged in users
        $scope.showNavigation = function () {
            return doorman.isLoggedIn();
        };
        $scope.logout = function(){
          doorman.logout(); //TODO unsaved changes warning
        };
        $scope.topics = [];
        $http.get(phpServerRoot + '/api/topic')
            .success(function (response) {
                $scope.topics = response;
            });
    });

