'use strict';

/**
 * @ngdoc function
 * @name amnohfelsClientApp.controller:NotfoundCtrl
 * @description
 * # NotfoundCtrl
 * Controller of the amnohfelsClientApp
 */
angular.module('amnohfelsClientApp')
  .controller('NotfoundCtrl', function ($scope) {
    $scope.data = {};
    $scope.data.errorMessage = '';
  });
