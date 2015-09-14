'use strict';

/**
 * @ngdoc function
 * @name amnohfelsClientApp.controller:DynamiclinkerCtrl
 * @description
 * # DynamiclinkerCtrl
 * Controller of the amnohfelsClientApp
 */

//TODO (1.0.1) improvement: as this is the same page, i could use a function instead of broadcast events?
//TODO (1.0.1) handle other statuses
//TODO (1.0.0) this needs to be renamed now with the new routing logic. better: put it all in a controller in scaffold modules directive (when it can then still be referenced via string in routeProvider)

angular.module('amnohfelsClientApp')
  .controller('DynamicLinkerCtrl', function ($scope, $routeParams, $http, config, dataObject, $timeout) {

    if (dataObject.status === 404) {
      // broadcast when child controller is instantiated
      $timeout(function () {
        $scope.$broadcast('status404');
      });
    } else {
      $scope.response = dataObject.data.modules;
      // broadcast when child controller is instantiated
      $timeout(function () {
        $scope.$broadcast('compile-modules');
      });
    }

  });
