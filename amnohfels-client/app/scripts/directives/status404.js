'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsClientApp.directive:status404
 * @description
 * # status404
 */
angular.module('amnohfelsClientApp')
  .directive('status404', function (config) {
    return {
      templateUrl: 'views/status404.html',
      restrict: 'E',
      controller: function ($scope) {
        $scope.adminMail = config.admin.mail;
      }
    };
  });
