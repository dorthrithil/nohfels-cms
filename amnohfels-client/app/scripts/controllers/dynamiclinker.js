'use strict';

/**
 * @ngdoc function
 * @name amnohfelsClientApp.controller:DynamiclinkerCtrl
 * @description
 * # DynamiclinkerCtrl
 * Controller of the amnohfelsClientApp
 */
angular.module('amnohfelsClientApp')
  .controller('DynamicLinkerCtrl', function ($scope, $routeParams, $http, config) {
    $http.get(config.server.api + 'page/' + $routeParams.pageTopic)
      .success(function (response) {
        $scope.response = response.modules;
        $scope.$broadcast('compile-modules'); //TODO (1.0.1) improvement: as this is the same page, i could use a function instead of events?
      })
      .error(function (response, status) {
        switch (status) {
          case 404:
            $scope.$broadcast('status404');
            break;
          default:
            console.error('unhandled error processing the page'); //TODO (1.0.1) handle statuses
        }
      });
  });
