'use strict';

/**
 * @ngdoc function
 * @name amnohfelsBackendApp.controller:NavigationCtrl
 * @description
 * # NavigationCtrl
 * Controller of the amnohfelsBackendApp
 */

angular.module('amnohfelsBackendApp')
    .controller('NavigationCtrl', function ($scope, $location, config, $http, doorman) {
        //for highlighting active page
        $scope.isOnPath = function (path) {
            return path === $location.path();
        };
        //only show navigation to logged in users
        $scope.showNavigation = function () {
            return doorman.isLoggedIn();
        };
        //function for logout button
        $scope.showConfirmLogoutButton = false;
        $scope.logout = function(){
          doorman.logout().then(function(){},function(){
              $scope.showConfirmLogoutButton = true;
          });
        };
        $scope.logoutDismiss = function(){
            $scope.showConfirmLogoutButton = false;
        };
        $scope.logoutConfirm = function(){
            $scope.showConfirmLogoutButton = false;
            doorman.hardLogout();
        };
        //request topics for building "edit page" dropdown
        $scope.topics = [];
        $http.get(config.server.api + 'topic')
            .success(function (response) {
                $scope.topics = response;
            });
    });

