'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:NavigationCtrl
 * @description
 * # NavigationCtrl
 * Controller of the webappApp
 */
angular.module('amnohfelsClientApp')
  .controller('NavigationCtrl', function ($scope, $location, topicService) {
    $scope.isOnPath = function (path) {
      return path === $location.path();
    };
    topicService.getHeadTopics().then(function (topics) {
      $scope.topics = topics;
    });
  });
