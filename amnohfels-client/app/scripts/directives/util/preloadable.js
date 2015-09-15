'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsClientApp.directive:preloadable
 * @description
 * # preloadable
 * broadcasts 'lbImageLoaded' to rootScope, to notify listeners, that image has finished loading.
 */

//TODO (1.0.1) can i use imgfadeinonload directive for this?

angular.module('amnohfelsClientApp')
  .directive('preloadable', function ($rootScope) {
    return {
      restrict: 'A',
        link: function(scope, element) {
            var broadcastLoaded = function(e){
                $rootScope.$broadcast('lbImageLoaded');
            };
            element.bind('load', broadcastLoaded);
        }
    };
  });
