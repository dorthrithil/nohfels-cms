'use strict';

/**
 * @ngdoc service
 * @name amnohfelsClientApp.preloadData
 * @description
 * # preloadData
 * Factory in the amnohfelsClientApp.
 */

//TODO (1.0.0) maybe catch 404 error differently so there's no valid route to `/#/404`. google what's common

//TODO handle unresolved image

angular.module('amnohfelsClientApp')
  .factory('preloadData', function ($http, config, $route, $q, preloadStatus) {

    var dataObject = {
      status: 200,
      data: null
    };

    return {
      getDataObject: function () {
        if ($route.current.params.pageTopic !== '404') {

          return $q(function(resolve) {
            preloadStatus.startInitialAnimation();
            $http.get(config.server.api + 'page/' + $route.current.params.pageTopic)
              .then(function(response){

                dataObject.data = response.data;

                var images = [];
                var imagesLoaded = 0;

                response.data.modules.forEach(function(element){
                  images = images.concat(element.imagePreloadArray);
                });

                preloadStatus.setSteps(images.length);

                for(var i = 0; i < images.length; i++){
                  var bgImg = new Image();
                  bgImg.onload = function () {
                    imagesLoaded++;
                    preloadStatus.incrementCompletedSteps();
                    if(imagesLoaded === images.length){
                      resolve(dataObject);
                    }
                  };
                  bgImg.src = config.server.root + images[i];
                }

                if(images.length === 0){
                  resolve(dataObject);
                }

              });
          });
        } else {
          return $q(function(resolve) {
            dataObject.status = 404;
            resolve(dataObject);
          });
        }
      }
    };
  });
