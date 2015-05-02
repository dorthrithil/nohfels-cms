'use strict';

/**
 * @ngdoc function
 * @name amnohfelsBackendApp.controller:NavigationCtrl
 * @description
 * # NavigationCtrl
 * Controller of the amnohfelsBackendApp
 */

//TODO unsaved changes warning on logout

angular.module('amnohfelsBackendApp')
    .controller('NavigationCtrl', function ($scope, $location, phpServerRoot, $http, doorman) {
        //for highlighting active page
        $scope.isOnPath = function (path) {
            return path === $location.path();
        };
        //only show navigation to logged in users
        $scope.showNavigation = function () {
            return doorman.isLoggedIn();
        };
        //function for logout button
        $scope.logout = function(){
          doorman.logout();
        };
        //request topics for building "edit page" dropdown
        $scope.topics = [];
        $http.get(phpServerRoot + '/api/topic')
            .success(function (response) {
                $scope.topics = response;
            });
    });

