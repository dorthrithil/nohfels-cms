'use strict';

/**
 * @ngdoc function
 * @name amnohfelsClientApp.controller:DynamiclinkerCtrl
 * @description
 * # DynamiclinkerCtrl
 * Controller of the amnohfelsClientApp
 * Receives `data` object with the preloaded page data from `routeProviders` resolve option. Passes this data to
 * `scaffoldModules` by attaching it to the scope. Handles eventual 404 error through a broadcast to `scaffoldModules`.
 */

//TODO (1.0.1) improvement: as this is the same page, i could use a function instead of broadcast events?
// or better the routeChangeSuccess event (take a look at routeChangeError, i think i can even pass the dataObject
// via the event, then i dont need to set a property on the shared scope)

//TODO better use the directives controller option, this way i have the scope in one file

angular.module('amnohfelsClientApp')
  .controller('DynamicLinkerCtrl', function ($scope, data, $timeout) {

    $scope.pageData = data.modules;
    // broadcast when child controller is instantiated
    $timeout(function () {
      $scope.$broadcast('compile-modules');
    });

  });
