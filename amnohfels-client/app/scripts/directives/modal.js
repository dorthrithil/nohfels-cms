'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsClientApp.directive:modal
 * @description
 * # modal
 */
angular.module('amnohfelsClientApp')
  .directive('modal', function () {
    return {
      templateUrl: 'views/modal.html',
      restrict: 'E',
      link: function postLink() {
      }
    };
  });
