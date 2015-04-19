'use strict';

/**
 * @ngdoc function
 * @name amnohfelsBackendApp.controller:PageCtrl
 * @description
 * # PageCtrl
 * Controller of the amnohfelsBackendApp
 */
angular.module('amnohfelsBackendApp')
  .controller('PageCtrl', function ($scope, $routeParams) {
        $scope.topic = $routeParams.topic;
  });
