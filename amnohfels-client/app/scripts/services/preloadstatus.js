'use strict';

/**
 * @ngdoc service
 * @name amnohfelsClientApp.preloadStatus
 * @description
 * # preloadStatus
 * Service in the amnohfelsClientApp.
 */

//TODO rename
//TODO if i uncomment the logs i will see, that not all steps are animated seperately. luckyly as the completed steps are always reliable the preloading bar is always 100% at the end. think about this a bit more...

angular.module('amnohfelsClientApp')
  .service('preloadStatus', function preloadStatus(animator) {

    var self = this;
    var $preloadingBar = null;
    var config = null;

    function getDefaultConfig() {
      return {
        steps: 0,
        completedSteps: 1, // this is 1 because the step for the second half never gets incremented
        animationStartRequested: false,
        animationStepsRequested: false,
        initialStepCompleted: false,
        stepsSet: false,
        stepWidth: 50,
        completedStepsAnimated: 0,
        animatingMutex: false
      }
    }

    this.setPreloadBar = function ($element) {
      $preloadingBar = $element;
      if (config.animationStartRequested) {
        self.startInitialAnimation();
      }
    };

    this.setSteps = function (stepsToSet) {
      config.steps = stepsToSet + 1; // +1 because the second half has to always animated
      //console.log('steps: '+config.steps);
      config.stepWidth = 50 / config.steps;
      //console.log('stepWidth' + config.stepWidth);
      config.stepsSet = true; // needed because there could also be 0 steps
      if (config.animationStepsRequested) {
        performAnimationStep();
      }
    };

    this.incrementCompletedSteps = function () {
      //console.log('incrementCompletedSteps()');
      config.completedSteps++;
      if (!config.animatingMutex) {
        //console.log('mute false');
        //console.log('calling performAnimationStep() from increment');
        performAnimationStep();
      }
    };

    this.startInitialAnimation = function () {
      //console.log('startInitialAnimation()');
      config = getDefaultConfig();
      if ($preloadingBar !== null) {
        $preloadingBar.css('width', '0%');

        // approximated animation for loading `api/page/*` json
        animator.increaseWidthTo($preloadingBar, '50%', 0, 500)
          .then(function () {
            config.initialStepCompleted = true;

            if (config.stepsSet && !config.animatingMutex) {
              //console.log('calling performAnimationStep() from init');
              performAnimationStep();
            } else {
              config.animationStepsRequested = true;
            }

          });

      } else {
        config.animationStartRequested = true;
      }
    };

    function performAnimationStep() {
      //console.log('performAnimationStep()');
      config.animatingMutex = true;
      var stepMargin = 50 + (1 + config.completedStepsAnimated) * config.stepWidth;
      animator.increaseWidthTo($preloadingBar, stepMargin + '%', 0, 500 / config.steps)
        .then(function () {
          config.completedStepsAnimated++;
          //console.log('completedSteps: ' + config.completedSteps);
          //console.log('completedStepsAnimated: ' + config.completedStepsAnimated);
          if (config.completedStepsAnimated < config.completedSteps) {
            //console.log('calling performAnimationStep() recursively [completedSteps: ' + config.completedSteps + ', animatedSteps: ' + config.completedStepsAnimated + ']');
            performAnimationStep();
          } else if (config.completedSteps === config.completedStepsAnimated && config.completedSteps === config.steps) {
            //console.log('finished');
            $preloadingBar.css('width', '0%');
          } else {
            config.animatingMutex = false;
          }
        });
    }
  });
