'use strict';

/**
 * @ngdoc function
 * @name amnohfelsBackendApp.controller:DynamicLinkerCtrl
 * @description
 * # DynamicLinkerCtrl
 * Controller of the amnohfelsBackendApp
 */
angular.module('amnohfelsBackendApp')
  .controller('DynamicLinkerCtrl', function ($scope, $routeParams) {
        $scope.pageTopic = $routeParams.pageTopic;
  });
