'use strict';

/**
 * @ngdoc function
 * @name amnohfelsClientApp.controller:FooterCtrl
 * @description
 * # FooterCtrl
 * Controller of the amnohfelsClientApp
 */
angular.module('amnohfelsClientApp')
  .controller('FooterCtrl', function ($scope, config, topicService) {
    $scope.date = new Date();
    $scope.company = config.company;
    topicService.getFootTopics().then(function(topics){
      $scope.topics = topics;
    });
  });
