'use strict';

/**
 * @ngdoc function
 * @name amnohfelsClientApp.controller:NachtigallentalCtrl
 * @description
 * # NachtigallentalCtrl
 * Controller of the amnohfelsClientApp
 */
angular.module('amnohfelsClientApp')
  .controller('NachtigallentalCtrl', function ($scope) {
    $scope.sectionData = {};
    $scope.sectionData.title = 'title';
    $scope.sectionData.caption = 'caption';
  });
