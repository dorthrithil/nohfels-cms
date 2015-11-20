'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsClientApp.directive:instagramModule
 * @description
 * # instagramModule
 */

//TODO (1.0.1) improvement: image preload indication to get rid of changing carousel height during loading process
//TODO (1.0.1) security: get CORS working instead of JSONP

angular.module('amnohfelsClientApp')
  .directive('instagramModule', function ($http, util, parallax, animator, $timeout, config) {
    return {

      templateUrl: 'views/instagram-module.html',
      restrict: 'E',
      scope: {
        data: '='
      },

      link: function postLink(scope, element) {
        // handle margin-top
        if (scope.firstModule) {
          element.children().addClass('first-module');
        }
      },

      controller: function ($scope, $element) {
        // maximum size of captions to prevent overflow
        $scope.captionOverflow = 200;

        // conditionally set data object defaults
        if (typeof $scope.data.maxPhotos === 'undefined') {
          $scope.data.maxPhotos = 10;
        }
        if (typeof $scope.data.filterForTags === 'undefined') {
          $scope.data.filterForTags = false;
        }
        if (typeof $scope.data.filterOutTags === 'undefined') {
          $scope.data.filterOutTags = true;
        }

        // configure instagram api path
        var userId = config.instagram.userId;
        var requestUrl = 'https://api.instagram.com/v1/users/' + userId +
          '/media/recent?client_id=358e5c279ec049b1abb1c2b0ec60863a&callback=JSON_CALLBACK';
        // default ng-show to hide section
        $scope.images = false;
        // do the http call
        $http.jsonp(requestUrl)
          .success(function (response) {
            if (response.meta.code !== 200) {
              // handle invalid success status
              handleHttpError(response);
            } else {
              // construct images array
              $scope.images = [];
              for (var i = 0; i < response.data.length; i++) {
                // push to array if tag is correct or filter for tag is off
                if (($scope.data.filterForTags && util.inStringArray(response.data[i].tags, $scope.data.tags) ||
                  $scope.data.filterForTags === false)) {
                  // map response to data object
                  $scope.images.push({
                    url: response.data[i].images.standard_resolution.url, //jshint ignore:line
                    caption: ($scope.data.filterOutTags) ? util.filterOutHashTags(response.data[i].caption.text)
                      : response.data[i].caption.text,
                    link: response.data[i].link,
                    dimensions: {
                      height: response.data[i].images.standard_resolution.height, //jshint ignore:line
                      width: response.data[i].images.standard_resolution.width //jshint ignore:line
                    }
                  });
                  // check for max array length
                  if (parseInt($scope.data.maxPhotos) === $scope.images.length) {
                    break;
                  }
                }
              }
            }
            // content height changed (because ng-show is not false anymore): refresh parallax
            if ($scope.images.length > 0) {
              // create a temporary image
              var bgImg = new Image();
              // and hook the function for refreshing parallax size to the onload event
              bgImg.onload = function () {
                parallax.refresh();
              };
              // provide a url (starts loading process)
              bgImg.src = $scope.images[0].url;
            }
          })
          .error(function (response) {
            // handle jsonp error
            handleHttpError(response);
          });

        $scope.test = function () {
          console.log('rtest');
        };

        // for handling jsonp errors
        var handleHttpError = function (response) {
          console.error('Instagram module encountered an error and was shut down. Dumping response for debugging:');
          console.log(response);
          // hide module, remove it from DOM and refresh parallax
          animator.shrinkHeightTo($element.children(), '0px').then(function () {
            $element.remove();
            // content height changed: refresh parallax
            $timeout(function () {
              parallax.refresh(); //TODO (1.0.1) better set up a window height listener in parallax service
            });
          });
        };

        // carousel triggers
        $scope.next = function () {
          $element.children().children().children().carousel('next');
        };
        $scope.previous = function () {
          $element.children().children().children().carousel('prev');
        };
      }
    };
  });
