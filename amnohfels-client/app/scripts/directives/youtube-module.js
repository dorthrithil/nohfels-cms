'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsClientApp.directive:youtube
 * @description
 * # youtube
 */
angular.module('amnohfelsClientApp')
  .directive('youtubeModule', function ($sce, youtubeVideoIdFilter) {
    return {
      templateUrl: 'views/youtube-module.html',
      restrict: 'E',
      scope: {
        data: '=',
        firstModule: '='
      },
      controller: function ($scope) {
        $scope.data.title = $sce.trustAsHtml($scope.data.title);
        $scope.data.url = $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + youtubeVideoIdFilter($scope.data.url));
      }
    };
  });
