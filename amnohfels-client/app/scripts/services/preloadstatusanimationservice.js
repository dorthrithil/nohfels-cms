'use strict';

/**
 * @ngdoc service
 * @name amnohfelsClientApp.preloadStatusAnimationService
 * @description
 * # preloadStatusAnimationService
 * Service in the amnohfelsClientApp.
 * Animates the `preloadBar` according to the progress. This can only be done approximately as no information can be
 * gathered about the current status of each element which needs to be preloaded. If the approximation is too slow, the
 * animation gets finished quickly by `quickFinishAnimation()`.
 */
angular.module('amnohfelsClientApp')
  .service('preloadStatusAnimationService', function preloadStatusAnimationService(animator) {

    var self = this;
    var $preloadBar = null;
    var config = null;

    /**
     * Get the default Config object. Contains all variables necessary to control the animation.
     * @returns {{
     *  steps: number,
     *  completedSteps: number,
     *  animationStartRequested: boolean,
     *  animationStepsRequested: boolean,
     *  stepsSet: boolean,
     *  stepWidth: number,
     *  completedStepsAnimated: number,
     *  animatingMutex: boolean,
     *  animationFinishRequested: boolean
     * }}
     */
    function getDefaultConfig() {
      return {
        // the number of steps the animation will have (usually how many elements have to be preloaded)
        steps: 0,
        // the number of elements finished loading. defaults to 1 because there is always one extra step after the
        // animation for the initial step. (imagine a page with no images on it. only the JSON get's preloaded which is
        // animated by the bar progressing 50%. then the second half has to be animated too. thus, default: 1)
        completedSteps: 1,
        // flag indicating that the initial animation start is requested. set when `startInitialAnimation` is called
        // but the `$preloadBar` DM object is not yet set. This will trigger `startInitialAnimation` again after the
        // DOM element is set with `setPreloadBar`
        animationStartRequested: false,
        // flag indicating that the initial animation finished but it's not yet clear how many follow up steps there
        // are. if this flag is set and `setSteps` is called, the animation steps are immediately starting
        animationStepsRequested: false,
        // flag indicating if the number of steps is already set. as steps default to zero, this flag is needed to test
        // if the steps have been already set, because there could also be zero steps.
        stepsSet: false,
        // width in percent for the preloadBar to get animated each step. gets set in `setSteps()`
        stepWidth: 0,
        // number of steps already animated
        completedStepsAnimated: 0,
        // mutex showing if the recursive `performAnimationStep()` is currently active. if not, it will be triggered
        // again when `incrementCompletedSteps()` is called
        animatingMutex: false,
        // flag indicating if all elements have finished loading. if so, `performAnimationStep()` will not call itself
        // recursively but call `quickFinishAnimation()` to quickly finish the animation and hide the preloadBar
        animationFinishRequested: false
      };
    }

    /**
     * set the DOM node containing the preloadBar
     * @param {HTMLElement} $element - DOM node containing the bar which has to be animated
     */
    this.setPreloadBar = function ($element) {
      $preloadBar = $element;
      // if `startInitialAnimation` was already called without the `$preloadBar` set, call it again
      if (config.animationStartRequested) {
        self.startInitialAnimation();
      }
    };

    /**
     * set the number of steps the animation will have
     * @param {number} stepsToSet - the number of steps the animation will have
     */
    this.setSteps = function (stepsToSet) {
      // +1 because there is always one extra step after the animation for the initial step. (imagine a page with no
      // images on it. only the JSON get's preloaded which is animated by the bar progressing 50%. then the second half
      // has to be animated too. thus, +1)
      config.steps = stepsToSet + 1;
      // the second half of the `$preloadBar` in equal parts
      config.stepWidth = 50 / config.steps;
      // needed because there could also be 0 steps (better explenation in `getDefaultConfig()`)
      config.stepsSet = true;
      // if initial step was finished before the number of steps was set, start animating the steps
      if (config.animationStepsRequested) {
        performAnimationStep();
      }
    };

    /**
     * increment the number of already completed staps (meaning how many elements have finished loading)
     */
    this.incrementCompletedSteps = function () {
      config.completedSteps++;
      // if everything is loaded, request the animation to be finished in one part quickly
      if (config.completedSteps === config.steps) {
        config.animationFinishRequested = true;
      }
      // if currently nothing is being animated, start the animation
      if (!config.animatingMutex) {
        performAnimationStep();
      }
    };

    /**
     * starts the initial animation, meaning that the first 50% of the bar are getting animated while the page json is
     * loading
     */
    this.startInitialAnimation = function () {
      // get a fresh config object
      config = getDefaultConfig();
      // if the `$preloadBar` dom node is already set, perform the initial animation
      if ($preloadBar !== null) {
        // animate
        config.animatingMutex = true;
        animator.increaseWidthTo($preloadBar, '50%', 0, 500)
          .then(function () {
            // when animation has not yet started and steps have been set, start step animation
            if (config.stepsSet && !config.animatingMutex) {
              performAnimationStep();
            } else {
              // otherwise mark step animation as requested
              config.animationStepsRequested = true;
            }
          });
      } else {
        // else mark the start as requested
        config.animationStartRequested = true;
      }
    };

    /**
     * performs an animation step. this function may call itself recursively
     */
    function performAnimationStep() {
      config.animatingMutex = true;
      // the point (in %) to which the `$preloadBar` will be animated
      var stepMargin = 50 + (1 + config.completedStepsAnimated) * config.stepWidth;
      animator.increaseWidthTo($preloadBar, stepMargin + '%', 0, 500 / config.steps)
        .then(function () {
          config.completedStepsAnimated++;
          // when not all steps which have been completed are yet animated
          if (config.completedStepsAnimated < config.completedSteps) {
            // go on animating or finish the whole animation
            if (!config.animationFinishRequested) {
              performAnimationStep();
            } else {
              quickFinishAnimation();
            }
          } else if (config.completedSteps === config.completedStepsAnimated &&
            config.completedSteps === config.steps) {
            // if everything had been animated chronologically, hide `$preloadBar`
            $preloadBar.css('width', '0%');
          } else {
            // when there is still something to animate but the elements have not been loaded yet
            config.animatingMutex = false;
          }
        });
    }

    /**
     * finishes the animation in one ste and hides the `$preloadBar`
     */
    function quickFinishAnimation() {
      animator.increaseWidthTo($preloadBar, '100%', 0, 200)
        .then(function () {
          $preloadBar.css('width', '0%');
        });
    }
  });
