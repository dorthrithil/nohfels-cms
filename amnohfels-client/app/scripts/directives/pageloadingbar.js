'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsClientApp.directive:pageLoadingBar
 * @description
 * # pageLoadingBar
 */

//TODO (1.0.0) a controller wold be enough

angular.module('amnohfelsClientApp')
  .directive('pageLoadingBar', function (preloadStatus, animator) {
    return {
      templateUrl: 'views/pageloadingbar.html',
      restrict: 'E',
      link: function postLink(scope, element) {

        preloadStatus.setPreloadBar(element.children().children());

        //function startInitialAnimation() {
        //  element.children().children().css('width', '0%');
        //  scope.showPageLoadingBar = true;
        //
        //  // approximated animation for loading page json
        //  animator.increaseWidthTo(element.children().children(), args.stepWidth + '%', 0, 500)
        //    .then(function(){
        //
        //    });
        //
        //  performAnimationStep({
        //    steps: preloadStatus.getSteps(),
        //    actualWidth: 0,
        //    stepWidth: 100 / preloadStatus.getSteps()
        //  });
        //}
        //
        //function performAnimationStep(args) {
        //  animator.increaseWidthTo(element.children().children(), args.stepWidth + '%', 0, 500);
        //}



      }
    };
  });
