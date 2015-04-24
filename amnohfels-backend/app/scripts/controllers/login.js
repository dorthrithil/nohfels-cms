'use strict';

/**
 * @ngdoc function
 * @name amnohfelsBackendApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the amnohfelsBackendApp
 */

//TODO form validation

angular.module('amnohfelsBackendApp')
    .controller('LoginCtrl', function ($scope, doorman, $location) {
        $scope.email = '';
        $scope.password = '';
        $scope.errorMessage = '';

        $scope.requestLogin = function () {
            doorman.login($scope.email, $scope.password).then(
                function () {
                    $location.path('/'); //TODO (1.0.1) enhancement: if user tried to access a different path then '/', redirect to that path now (buffer in .run())
                },
                function (response) {
                    $scope.errorMessage = response;
                }
            );
        };
    });
