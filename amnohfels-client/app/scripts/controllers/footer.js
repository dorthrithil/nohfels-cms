'use strict';

/**
 * @ngdoc function
 * @name amnohfelsClientApp.controller:FooterCtrl
 * @description
 * # FooterCtrl
 * Controller of the amnohfelsClientApp
 */
angular.module('amnohfelsClientApp')
  .controller('FooterCtrl', function ($scope) {
    $scope.date = new Date();
  });
