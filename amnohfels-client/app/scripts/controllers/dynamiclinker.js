'use strict';

/**
 * @ngdoc function
 * @name amnohfelsClientApp.controller:DynamiclinkerCtrl
 * @description
 * # DynamiclinkerCtrl
 * Controller of the amnohfelsClientApp
 * Receives `dataObject` with the preloaded page data from `routeProviders` resolve option. Passes this data to
 * `scaffoldModules` by attaching it to the scope. Handles eventual 404 error through a broadcast to `scaffoldModules`.
 */

//TODO (1.0.1) improvement: as this is the same page, i could use a function instead of broadcast events?
//TODO (1.0.1) handle other statuses

angular.module('amnohfelsClientApp')
  .controller('DynamicLinkerCtrl', function ($scope, dataObject, $timeout) {

    // either request to compile the requested page or to compile the 404 page, depending on status
    if (dataObject.status === 404) {
      // broadcast when child controller is instantiated
      $timeout(function () {
        $scope.$broadcast('status404');
      });
    } else {
      // `scaffoldModules` will pick that data up
      $scope.pageData = dataObject.data.modules;
      // broadcast when child controller is instantiated
      $timeout(function () {
        $scope.$broadcast('compile-modules');
      });
    }

  });
