'use strict';

/**
 * @ngdoc function
 * @name amnohfelsBackendApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the amnohfelsBackendApp
 */

angular.module('amnohfelsBackendApp')
    .controller('LoginCtrl', function ($scope, doorman, $location, $routeParams, translations) {
        $scope.email = '';
        $scope.password = '';
        $scope.logoutReason = $routeParams.logoutReason;
        $scope.errorMessages = translations.getErrorMessages();
        $scope.loginRequestRejected = false;

        $scope.requestLogin = function () {
            if ($scope.form.$valid) {
                doorman.login($scope.email, $scope.password).then(
                    function () {
                        $location.path('/'); //TODO (1.0.1) enhancement: if user tried to access a different path then '/', redirect to that path now (buffer in .run())
                    },
                    function (response) {
                        $scope.errorMessage = response;
                    }
                );
            } else {
                $scope.loginRequestRejected = true;
            }
        };
    });
