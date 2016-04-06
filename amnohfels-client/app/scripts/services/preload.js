'use strict';

/**
 * @ngdoc service
 * @name amnohfelsClientApp.preload
 * @description
 * # preload
 * Factory in the amnohfelsClientApp.
 * Preloads page JSON and all contained image before route change is performed. Passes progress to
 * `preloadStatusAnimationService`. Finally the servers response data object containing the JSON is passed to
 * `scaffoldModules` (via the dynamic linker) which compiles the new page.
 */

angular.module('amnohfelsClientApp')
  .factory('preload', function ($http, config, $route, $q, preloadStatusAnimationService, $timeout) {

    return {
      // `routeProvider` calls this for every requested page
      getDataObject: function () {

        return $q(function (resolve, reject) {

          // use the timestamp as issuer id to make sure that only the newest route change promise gets animated
          var issuerId = Date.now();

          // start the animation
          preloadStatusAnimationService.startInitialAnimation(issuerId);
          // get JSON
          $http.get(config.server.api + 'page/' + $route.current.params.pageTopic)
            .then(function (response) {

              // preload images
              var images = [];
              var imagesLoaded = 0;

              // build image array by concating each modules image array
              response.data.modules.forEach(function (element) {
                images = images.concat(element.imagePreloadArray);
              });

              // now that we know how many images there are to preload, we can set the preload steps
              preloadStatusAnimationService.setSteps(images.length, issuerId);

              // this function handles the actions which need to be performed after an image is loaded
              var preloadImage = function () {
                imagesLoaded++;
                preloadStatusAnimationService.incrementCompletedSteps(issuerId);
                // the promise gets resolved when all images are loaded (this triggers the route change)
                if (imagesLoaded === images.length) {
                  jQuery('init-loading-spinner').remove();
                  resolve(response.data);
                }
              };

              // loop through all images and load them
              for (var i = 0; i < images.length; i++) {
                var bgImg = new Image();
                bgImg.onload = preloadImage;
                bgImg.onerror = preloadImage;
                bgImg.src = config.server.root + images[i];
              }

              // if there are no images, resolve immediately
              if (images.length === 0) {
                jQuery('init-loading-spinner').remove();
                resolve(response.data);
              }

            }, function (response) {
              // in case of error: reject and finish preload animation. error directive will show an error via
              // routeChangeError
              reject(response);
              preloadStatusAnimationService.setSteps(1, issuerId);
              preloadStatusAnimationService.incrementCompletedSteps(issuerId);
            });
        });
      }
    };
  });
