'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsClientApp.directive:preloadBar
 * @description
 * # preloadBar
 * Holds th template for the Youtube-style preloading bar. The loading bar gets animated on route changes and indicates
 * the user how long he has to wait until all requested resources have been loaded. The actual animation is controlled
 * by the `preloadStatusAnimationService`.
 */

angular.module('amnohfelsClientApp')
  .directive('preloadBar', function (preloadStatusAnimationService) {
    return {
      templateUrl: 'views/preloadbar.html',
      restrict: 'E',
      controller: function($scope, $element){
        // pass the preloadBar DOM element to the `preloadStatusAnimationService`
        preloadStatusAnimationService.setPreloadBar($element.children().children());
      }
    };
  });
