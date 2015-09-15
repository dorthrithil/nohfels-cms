'use strict';

/**
 * @ngdoc service
 * @name amnohfelsClientApp.preload
 * @description
 * # preload
 * Factory in the amnohfelsClientApp.
 * Preloads page JSON and all contained image before route change is performed. Passes progress to
 * `preloadStatusAnimationService`. Finally the `dataObject` containing the JSON is passed to `scaffoldModules` which
 * compiles the new page.
 */

//TODO (1.0.0) maybe catch 404 error differently so there's no valid route to `/#/404`. google what's common

//TODO handle unresolved images

//TODO abort functionality! requesting a different page while another one is still loading is not possible at the moment

angular.module('amnohfelsClientApp')
  .factory('preload', function ($http, config, $route, $q, preloadStatusAnimationService) {

    // default data Object. Gets populated by getDataObject
    var dataObject = {
      status: 200,
      data: null
    };

    return {
      // `routeProvider` calls this for every requested page
      getDataObject: function () {
        if ($route.current.params.pageTopic !== '404') {

          return $q(function (resolve) {
            // start the animation
            preloadStatusAnimationService.startInitialAnimation();
            // get JSON
            $http.get(config.server.api + 'page/' + $route.current.params.pageTopic)
              .then(function (response) {

                // populate dataObject with the loaded data
                dataObject.data = response.data;

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
                    resolve(dataObject);
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
                  resolve(dataObject);
                }

              });
          });

        } else {
          // resolve with a status 404
          return $q(function (resolve) {
            dataObject.status = 404;
            resolve(dataObject);
          });
        }
      }
    };
  });
