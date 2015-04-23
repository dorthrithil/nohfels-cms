'use strict';

/**
 * @ngdoc function
 * @name amnohfelsBackendApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the amnohfelsBackendApp
 */
angular.module('amnohfelsBackendApp')
  .controller('LoginCtrl', function ($scope, doorman) {
        $scope.email = '';
           $scope.password = '';

        $scope.requestLogin = function(){
            doorman.login($scope.email, $scope.password);
        };
  });
