'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsBackendApp.directive:modalTextForm
 * @description
 * # modalTextForm
 */
angular.module('amnohfelsBackendApp')
  .directive('modalTextForm', function () {
    return {
      templateUrl: 'views/modaltextform.html',
      restrict: 'E',
      link: function postLink() {
      }
    };
  });
