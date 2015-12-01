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

//TODO handle unresolved images

//TODO abort functionality! requesting a different page while another one is still loading is not possible at the moment

//TODO q can not be canceled -> register promise in preloadservice as current promise and always check that its the newest before animating

angular.module('amnohfelsClientApp')
  .factory('preload', function ($http, config, $route, $q, preloadStatusAnimationService) {

    return {
      // `routeProvider` calls this for every requested page
      getDataObject: function () {

        return $q(function (resolve, reject) {

          // start the animation
          preloadStatusAnimationService.startInitialAnimation();
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
              preloadStatusAnimationService.setSteps(images.length);

              // this function handles the actions which need to be performed after an image is loaded
              var preloadImage = function () {
                imagesLoaded++;
                preloadStatusAnimationService.incrementCompletedSteps();
                // the promise gets resolved when all images are loaded (this triggers the route change)
                if (imagesLoaded === images.length) {
                  resolve(response.data);
                }
              };

              // loop through all images and load them
              for (var i = 0; i < images.length; i++) {
                var bgImg = new Image();
                bgImg.onload = preloadImage;
                bgImg.src = config.server.root + images[i];
              }

              // if there are no images, resolve immediately
              if (images.length === 0) {
                resolve(response.data);
              }

            }, function (response) {
              // in case of error: reject and finish preload animation. error directive will show an error via
              // routeChangeError
              reject(response);
              preloadStatusAnimationService.setSteps(1);
              preloadStatusAnimationService.incrementCompletedSteps();
            });
        });
      }
    };
  });
